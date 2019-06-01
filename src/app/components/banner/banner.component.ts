import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, keyframes, animate } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    // Main Image
    trigger('slide', [
      transition('*<=>*', [
        style({opacity: 0}),
        animate('1.3s ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(95%) translateY(60%) scale(2)' }),
            style({opacity: 0.99, transform: 'translateX(95%) translateY(60%) scale(2)' }),
            style({opacity: 1, transform: 'translateX(0) translateY(0) scale(1)' })
        ]))
      ])
    ]),

    // Heading Text
    trigger('fadeIn', [
      transition('*<=>*', [ 
        style({opacity: 0}),
          animate('.6s 1.2s ease-in', style({opacity: 1}))
      ])
    ])  

  ]
})
export class BannerComponent implements OnInit, OnDestroy {

  disableSlideImageAnimation:boolean=false;
  handset: boolean;
  firstVisit: boolean;

  constructor( private dataService: DataService ) {
    this.handset = this.dataService.isHandset;
    this.firstVisit = dataService.initialHome;

    if(this.handset || this.firstVisit){
      this.disableSlideImageAnimation = true;
    }

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.initialHome = true;
  }

}
