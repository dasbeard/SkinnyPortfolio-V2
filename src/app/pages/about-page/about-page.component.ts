import { Component, OnInit } from '@angular/core';
import { slideLeft, fade, textFade, dropDown, dropDownStagger, fadeIn } from '../../animation';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  animations: [
    slideLeft,
    textFade,
    // dropDownStagger
  ]
})
export class AboutPageComponent implements OnInit {

  animate: boolean = false;
  discogImages = { image75: null, image200: null, image425: null };
  antaresImages = {};
  fabFilterImages = {};
  
  constructor( private dataService: DataService, private storage:AngularFireStorage) {
    this.animate = this.dataService.initialLinks;
  }
  
  ngOnInit() {
    this.getImages();
  }

  getImages() {
    // Get images for Discogs

    const ref75 = this.storage.ref(`brands/thumb@75_discogs_logo.png`);
    this.discogImages.image75 = ref75.getDownloadURL();
    const ref200 = this.storage.ref(`brands/thumb@200_discogs_logo.png`);
    this.discogImages.image200 = ref200.getDownloadURL();
    const ref425 = this.storage.ref(`brands/thumb@425_discogs_logo.png`);
    this.discogImages.image425 = ref425.getDownloadURL();
    
    // console.log(this.discogImages);
    
    // this.discogsImages = await this.dataService.getPlugsImages('discogs_logo.png');
    
    // console.log(this.discogsImages);
    
  }


}
