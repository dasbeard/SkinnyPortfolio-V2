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
  // downloadURL: Observable<string>;
  URL: string;

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
      ref.orderBy("year", "desc")
    );

    this.linksCollection = afs.collection<LinkModel>("links");
    this.links = this.linksCollection.valueChanges();
  }

  uploadAlbum(data) {
    const file = data.image;
    const date = new Date().toISOString();

    var [fname, extension] = file.name.split('.')
    .reduce((acc, val, i, arr) => (i == arr.length - 1) 
        ? [acc[0].substring(1), val] 
        : [[acc[0], val].join('.')], []);

    // console.log(data.image);
 
    const fileName = `${data.artist}-${data.album}-${date}.${extension}`;
    const filePath = `Originals/${fileName}`; // Names new Image
    // const filePath = `Originals/${data.artist}-${data.album}-${date}.${extension}`; // Names new Image
    // const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Observe percent change
    this.uploadPercent = task.percentageChanges();

    task 
      .snapshotChanges()
      .pipe(
        finalize( async () => {
          let newAlbum = await this.getImageURLs( data, fileName);
          this.albumCollection.add(newAlbum);
        })
      )
      .subscribe();
  }


  async getImageURLs( albumData, fileName ) {
    
    const originalImage = `Originals/${fileName}`;
    const image75 = `Originals/thumb@75_${fileName}`;
    const image200 = `Originals/thumb@200_${fileName}`;
    const image425 = `Originals/thumb@425_${fileName}`;

    albumData.image = await firebase.storage().ref(originalImage).getDownloadURL();


    const retries = 10;

    albumData.image75 = await this.getThumbs( image75, retries );
    albumData.image200 = await this.getThumbs( image200, retries );
    albumData.image425 = await this.getThumbs( image425, retries );
    return albumData;
    
  }


    async getThumbs(fileName, retries) {
      let i;
      let newURL;
      for (i = 0; i < retries; ++i) {
        try {
          newURL = await firebase.storage().ref(fileName).getDownloadURL();
          break;
        } catch(err) {
          // console.log(err);
        }
      }
      return newURL
    }


  getAllAlbums() {
    this.allAlbums = this.albumCollection.snapshotChanges().pipe(
      map(action =>
        action.map(a => {
          const data = a.payload.doc.data() as AlbumModel;
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      )
    )
    return this.allAlbums;
  }


  // TODO: Delete image when deleting album
    // firebase.storage().ref(`ImageName`).delete()  // Remove Image based on name

  deleteAlbum(albumID:string) {
    this.singleAlbum = this.afs.doc(`albums/${albumID}`);
    this.singleAlbum.delete();
  }

  deleteLink(linkID: string) {
    this.singleLink = this.afs.doc(`links/${linkID}`);
    this.singleLink.delete();
  }

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
