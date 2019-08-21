import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSort } from '@angular/material';
import { AlbumModel } from 'src/app/models/album';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-remove-album',
  templateUrl: './remove-album.component.html',
  styleUrls: ['./remove-album.component.css']
})
export class RemoveAlbumComponent implements OnInit {

  allAlbums: AlbumModel[];
  otherCreditType:boolean = false;
  templateString:string = "loading albums..."

  constructor(
    private dataService: DataService, 
    private storage: AngularFireStorage,
    private fb: FormBuilder) { 
    
    this.dataService.getAllAlbums().subscribe(albums => {
      this.allAlbums = albums
      
      if (this.allAlbums == undefined){
        this.templateString = "No Albums"
      } else {
        albums.map(album => {
          if(album.image75 === 'null'){
            this.dataService.addImage75(album);
          }
        })        
      }

    })

  }
   

  ngOnInit() { }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  addCredit(album){
    const last = album.credits[album.credits.length -1].replace(/\s/g,'');
    if (last === ''){
      return
    } else {
      album.credits.push('');
    }
  }

  removeCredit(album, index){
    album.credits.splice(index, 1)
  }

  updateAlbum(album){
    album.credits = this.validateLastCredit(album.credits)
    this.dataService.updateAlbum(album);
  }
  
  deleteAlbum(id: string, imageName) {
    this.dataService.deleteAlbum(id, imageName);
  }
  
  showOtherCreditType(event){
    
    if(event.value === 'Other'){  
      this.otherCreditType = true;
      
    } else {
      this.otherCreditType = false;
    }

  }


  validateLastCredit(credits) {
    if (credits.length <1) {
      return
    } else {
      let lastCreditTrim = credits[credits.length - 1].replace(/\s/g,'');
      if (lastCreditTrim === '') {
        credits.pop();
        return credits;
      }
      return credits;
    }
  }

}

