import { Component, OnInit } from '@angular/core';

// import { NgxMasonryOptions } from 'ngx-masonry';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes


@Component({
  selector: 'app-photography-page',
  templateUrl: './photography-page.component.html',
  styleUrls: ['./photography-page.component.css']
})
export class PhotographyPageComponent implements OnInit {

  _masonry: Masonry;
  // masonryItems: any[]; // NgMasonryGrid Grid item list

  masonryItems = [];

	public masonryOptions = {
    transitionDuration: '0.6s',
    itemSelector: ".grid-item",
    gutter: 10,
    horizontalOrder: true,
		resize: true,
		initLayout: true,
		fitWidth: true,
    columnWidth: 20,
    // percentPosition: true,
  
  };


  // masonryOptions = {
  //   transitionDuration: '0.8s',
  //   columnWidth: 20,
  //   percentPosition: true,
  //   gutter: 10,
  //   isFitWidth: true
  //   // itemSelector: '.masonry-item',
  //   // columnWidth: 30,
  //   // percentPosition: true
  // };

  constructor() { 
    this.generateRandomImages();
  }

  ngOnInit() {  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }


  generateRandomImages() {
    // const baseURL = 'http://placekitten.com/';
    const baseURL = 'https://picsum.photos/';
    const imageCount = 20;

    for ( let i =0; i<imageCount; i++) {
      let width = Math.floor((Math.random() * 21) + 20) * 10;
      let height = Math.floor((Math.random() * 21) + 20) * 10;

      let newImageURL = baseURL + '/' + width + '/' + height;
      let newImage = {url: newImageURL, width:width, height: height};

      this.masonryItems.push(newImage);
    }

    console.log(this.masonryItems);
    
    
  }

}
