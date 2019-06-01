import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, finalize, retry } from "rxjs/operators";
import { AlbumModel } from "../models/album";
import { LinkModel } from "../models/links";

import * as firebase from "firebase";


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

    const filePath = `Originals/${data.artist}-${data.album}-${date}`; // Names new Image
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Observe percent change
    this.uploadPercent = task.percentageChanges();

    task 
      .snapshotChanges()
      .pipe(
        finalize( () => {
          this.downloadURL = fileRef.getDownloadURL();

          this.printURL(data);
        })
      )
      .subscribe();
  }

  async printURL(albumData) {
    this.downloadURL.subscribe( async newUrl => {
      albumData.image = newUrl;

      this.albumCollection.add(albumData);
    })
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
