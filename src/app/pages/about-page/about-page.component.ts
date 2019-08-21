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
  discogImages = { image75: null, image200: null };
  antaresImages = {};
  fabFilterImages = {};
  
  constructor( private dataService: DataService, private storage:AngularFireStorage) {
    this.animate = this.dataService.initialLinks;
  }
  
  ngOnInit() {
  }

}
