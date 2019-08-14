import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photography-page',
  templateUrl: './photography-page.component.html',
  styleUrls: ['./photography-page.component.css']
})
export class PhotographyPageComponent implements OnInit {
  
  masonryItems = [];

  dummyImages = [
    {url: 'https://picsum.photos/300/350', width:300, height:350},
    {url: 'https://picsum.photos/300/400', width:300, height:400},
    {url: 'https://picsum.photos/500/300', width:500, height:300},
    {url: 'https://picsum.photos/350/275', width:350, height:275},
    {url: 'https://picsum.photos/380/300', width:380, height:300},
    {url: 'https://picsum.photos/250/250', width:250, height:250},
    {url: 'https://picsum.photos/425/450', width:425, height:450},
    {url: 'https://picsum.photos/275/350', width:275, height:350},
    {url: 'https://picsum.photos/220/300', width:220, height:300},
    {url: 'https://picsum.photos/400/375', width:400, height:375},
    {url: 'https://picsum.photos/250/350', width:250, height:350},
  ]


  testCondition:boolean = false;


  constructor() { 
    this.generateRandomImages();
  }

  ngOnInit() {  }

  test(index){
    console.log(index);
    
    this.testCondition = !this.testCondition; 
    
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

    // console.log(this.masonryItems);
    
  }

}
