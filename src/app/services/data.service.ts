import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable, BehaviorSubject } from "rxjs";
import { map, finalize, retry } from "rxjs/operators";
import { AlbumModel } from "../models/album";
import { LinkModel } from "../models/links";

import * as firebase from "firebase";
import { async } from '@angular/core/testing';
// import { async } from 'q';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Link Variables
  linksCollection: AngularFirestoreCollection<LinkModel>;
  links: Observable<LinkModel[]>;
  singleLink: AngularFirestoreDocument<LinkModel>;

  // Album Variables
  private albumCollection: AngularFirestoreCollection<AlbumModel>;
  allAlbums: Observable<AlbumModel[]>;
  singleAlbum: AngularFirestoreDocument<AlbumModel>;

  // For Image upload
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  

  private basePath: string = "uploads";
  private uploadTask: firebase.storage.UploadTask;
  newUploadPercent: number;

  // For Initial Animation
  initialHome: boolean = false;
  initialLinks: boolean = false;
  initialContact: boolean = false;
  isHandset: boolean;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { 
    this.albumCollection = this.afs.collection<AlbumModel>("albums", ref =>
      ref.orderBy("releaseDate", "desc")
    );

    this.linksCollection = this.afs.collection<LinkModel>("links", ref => 
      ref.orderBy("date", "desc")
    );
    this.links = this.linksCollection.valueChanges();
  }
  
  deleteAlbum(albumID:string, imageName: string) {
    // console.log(albumID);
    // console.log(imageName);
    
    this.storage.storage.ref(`Albums/${imageName}`).delete();
    this.storage.storage.ref(`Albums/thumb@75_${imageName}`).delete();
    this.storage.storage.ref(`Albums/thumb@200_${imageName}`).delete();
    this.storage.storage.ref(`Albums/thumb@425_${imageName}`).delete();

    this.singleAlbum = this.afs.doc(`albums/${albumID}`);
    this.singleAlbum.delete();
  
  }

  uploadAlbum(data) {
    // console.log(data);
   
    const file = data.image;
    const date = data.releaseDate;

    var [fname, extension] = file.name.split('.')
    .reduce((acc, val, i, arr) => (i == arr.length - 1) 
        ? [acc[0].substring(1), val] 
        : [[acc[0], val].join('.')], []);

    // console.log(data.image);
 
    const fileName = `${data.artist}-${data.album}-${date}.${extension}`;
    const filePath = `Albums/${fileName}`; 
    const task = this.storage.upload(filePath, file);
    
    data.imageName = fileName;

    this.uploadPercent = task.percentageChanges();
    
    
    task 
    .snapshotChanges()
    .pipe(
        finalize( async () => {
          
          let newAlbum = await this.getImage( data, fileName);
          this.albumCollection.add(newAlbum);          
          
        })
      )
      .subscribe();

      setTimeout(() => {
        console.log('test');
        this.test(data);
        console.log('test2');
        
      }, 5000);

    // addImage75(newAlbum)

  }

  test(albumData){
    console.log(albumData);

    firebase.firestore().collection('albums').where('imageName', "==", albumData.imageName)
      .get()
      .then( data => {
        data.forEach( async album => {
          const updatedAlbum = album.data()

          this.singleAlbum = this.afs.doc(`albums/${updatedAlbum.id}`);
          let tempImage75 = await this.addImage75(updatedAlbum);
          console.log(tempImage75);
          
          // updatedAlbum.image75 = await tempImage75;
          

          // this.singleAlbum.update( await updatedAlbum);
        })
        
      })

      
    }
    
    // this.afs.collection('albums', ref => ref.where('imageName', '==', albumData.imageName)).get()

  test2(album) {
    
    let tempImage75 = this.afs.collection('albums', ref => ref.where('imageName', '==', album.imageName))
      .snapshotChanges()
      .pipe(
        map(action => 
          action.map (a => {
            const data = a.payload.doc.data() as AlbumModel;
            const image75 = this.storage.ref(`Albums/thumb@75_${album.imageName}`).getDownloadURL();
            console.log(image75);
            
            return {image75, ...data}
          }))
      )

    console.log(tempImage75);
    
    return tempImage75;

  }



  async getImage(albumData, fileName) {
    const originalImage = `Albums/${fileName}`;
    albumData.image = await firebase.storage().ref(originalImage).getDownloadURL();

    // console.log(albumData);

    return albumData;
  }

  async addImage75(album){
    // console.log(album);
    const retries = 10;
    let newURL;
    let i;

    for (i = 0; i< retries; i++){
      try {
        newURL = await this.storage.ref(`Albums/thumb@75_${album.imageName}`);
        break;
      } catch (err){}
    }
    
    console.log(newURL, i);
    
    return newURL;
  }





  async getThumbs(fileName) {
    const retries = 10;
    let newURL;
    // let error;
    let i;

    for (i = 0; i < retries; ++i) {
      // console.log('-----');
      try {
        newURL = await firebase.storage().ref(fileName).getDownloadURL();
        break;
      } catch(err) {
        // console.log(err);
        // error = err;
      }
    }
      console.log(i);
    // console.log(error);
    return newURL
  

  }


  getPlugsImages(fileName:string) {
    console.log(fileName);
    
    const ref75 = this.storage.storage.ref(`brands/thumb@75_${fileName}`);
    let image75 = ref75.getDownloadURL();
    const ref200 = this.storage.storage.ref(`brands/thumb@200_${fileName}`);
    let image200 = ref200.getDownloadURL();
    const ref425 = this.storage.storage.ref(`brands/thumb@425_${fileName}`);
    let image425 = ref425.getDownloadURL();
    
    const images = {image75:image75, image200: image200, image425: image425}
    
    return images;
  }

  getAllAlbums() {
    this.allAlbums = this.albumCollection.snapshotChanges().pipe(
      map(action => 
        action.map(a => {
          const data = a.payload.doc.data() as AlbumModel;
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      )
    )
    return this.allAlbums;
  }

  updateAlbum(album) {
    if ( Object.prototype.toString.call(album.releaseDate) === "[object Date]" ) {
      album.releaseDate = album.releaseDate.toISOString();
    }

    this.singleAlbum = this.afs.doc(`albums/${album.id}`);
    this.singleAlbum.update(album);
  }


  //  -=-=-=-=-=-=-= Links -=-=-=-=-=-=-=

  addNewLink(newLink: LinkModel) {
    if (
      newLink.url.substring(0, 7) != "http://" &&
      newLink.url.substring(0, 8) != "https://"
      ) {
      newLink.url = "http://" + newLink.url;
      this.linksCollection.add(newLink);
    } else {
      this.linksCollection.add(newLink);
    }
  }
  
  deleteLink(linkID: string) {
    this.singleLink = this.afs.doc(`links/${linkID}`);
    this.singleLink.delete();
  }
  
  updateLink(link: LinkModel) {
    this.singleLink = this.afs.doc(`links/${link.id}`);
    this.singleLink.update(link);
  }

  getAllLinks() {
    this.links = this.linksCollection.snapshotChanges().pipe(
      map(action => 
        action.map(a => {
          const data = a.payload.doc.data() as LinkModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    )
    return this.links;
  }


}
