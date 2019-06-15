import { Component, OnInit, OnDestroy} from '@angular/core';
import { slideRight, fade, textFade } from '../../animation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  animations: [
    slideRight,
    textFade
  ]
})
export class ContactPageComponent implements OnInit, OnDestroy {

  animate: boolean = false;

  constructor( private dataService: DataService) {
    this.animate = this.dataService.initialContact;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.initialContact = true;
  }

}
