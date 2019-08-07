import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumModel } from '../../models/album'
import { fade } from 'src/app/animation';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.css'],
  animations: [
    fade
  ]
})
export class DisplayAlbumComponent implements OnInit {

  @Input() albumInfo: AlbumModel;
  
  images = { image200: null, image425: null };
  ready:boolean = false;

  constructor(private dataservice: DataService, private storage: AngularFireStorage) { 

  }
  
  ngOnInit() {
    this.getThumbs();
    // console.log(this.albumInfo);
    
  }
  
  getThumbs () {
    const ref200 = this.storage.ref(`Albums/thumb@200_${this.albumInfo.imageName}`);
    this.images.image200 = ref200.getDownloadURL();
    const ref425 = this.storage.ref(`Albums/thumb@425_${this.albumInfo.imageName}`);
    this.images.image425 = ref425.getDownloadURL();
    this.ready = true;
  }

  openSpotify(url) {
    window.open(url, "_blank");
  }

}
