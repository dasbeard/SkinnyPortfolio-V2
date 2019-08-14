import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from 'src/app/services/data.service';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-photography-page',
  templateUrl: './photography-page.component.html',
  styleUrls: ['./photography-page.component.css']
})
export class PhotographyPageComponent implements OnInit {
  
  isHandset$: boolean;

  masonryItems = [];

  dummyImages = [
    {url: 'https://picsum.photos/300/350', width:300, height:350},
    {url: 'https://picsum.photos/300/400', width:300, height:400},
    {url: 'https://picsum.photos/500/300', width:500, height:700},
    {url: 'https://picsum.photos/350/275', width:350, height:275},
    {url: 'https://picsum.photos/380/300', width:380, height:300},
    {url: 'https://picsum.photos/250/250', width:250, height:250},
    {url: 'https://picsum.photos/425/450', width:425, height:450},
    {url: 'https://picsum.photos/275/350', width:275, height:350},
    {url: 'https://picsum.photos/220/300', width:220, height:300},
    {url: 'https://picsum.photos/400/375', width:400, height:375},
    {url: 'https://picsum.photos/250/350', width:250, height:350},
  ]

  constructor(
    public dialog:MatDialog, 
    private breakpointObserver: BreakpointObserver,
    private dataservice:DataService
  ) { 
    this.generateRandomImages();
    this.isHandset$ = this.dataservice.isHandset;
  }

  ngOnInit() {  }


  generateRandomImages() {
    // const baseURL = 'http://placekitten.com/';
    const baseURL = 'https://picsum.photos/';
    const imageCount = 20;

    for ( let i =0; i<imageCount; i++) {
      let width = Math.floor((Math.random() * 41) + 40) * 10;
      let height = Math.floor((Math.random() * 41) + 40) * 10;

      let newImageURL = baseURL + '/' + width + '/' + height;
      let newImage = {url: newImageURL, width:width, height: height};

      this.masonryItems.push(newImage);
    }
  }



  openDialog(item): void {
    if(!this.isHandset$){
      let imageWidth = item.width;
      const dialogRef = this.dialog.open(photographyDialog, {
        width: imageWidth,
        maxHeight: '95vh',
        panelClass: 'photoDialog',
        backdropClass: 'photoDialogBackdrop',
        data: item
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    }
  }

}


@Component({
  selector: 'photographyDialog',
  template: ` 
              <img  class="image" 
                src="{{item.url}}" 
                alt=""
              > 
            ` ,
  styles: [
            `.image {
              width: 98%;
              height: 98.5%;
              margin: 1% 1% .25% 1%;
              border-radius: 3px;
            }
            `
  ]
})




export class photographyDialog {
  item;

  constructor(
    public dialogRef: MatDialogRef<photographyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
    this.item = data;
    // console.log(this.item);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}