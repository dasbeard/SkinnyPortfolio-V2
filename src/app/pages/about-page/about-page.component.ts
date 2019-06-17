import { Component, OnInit } from '@angular/core';
import { slideLeft, fade, textFade, dropDown, dropDownStagger, fadeIn } from '../../animation';
import { DataService } from 'src/app/services/data.service';

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

  constructor( private dataService: DataService) {
    this.animate = this.dataService.initialLinks;
   }

  ngOnInit() {
  }

}
