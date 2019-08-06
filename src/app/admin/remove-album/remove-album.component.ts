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
  // @ViewChild(MatSort) sort: MatSort;
  otherCreditType:boolean = false;

  

  // albumToEdit: FormGroup;

  // get moreCredits() {
  //   return this.albumToEdit.get("moreCredits") as FormArray;
  // }

  // addCredit() {
  //   if(this.albumToEdit.value.moreCredits.length > 0){
  //     let last = this.albumToEdit.value.moreCredits[this.albumToEdit.value.moreCredits.length -1].replace(/\s/g,'');
  //     if (last === ''){
  //       return
  //     } else {
  //       this.moreCredits.push(this.fb.control(""));
  //     }
  //   } else {
  //     this.moreCredits.push(this.fb.control(""));
  //   }
  // }

  // removeCredit(index: number): void {
  //   const arrayControl = <FormArray>this.albumToEdit.controls['moreCredits'];
  //   arrayControl.removeAt(index);
  // }


  
  constructor(
    private dataService: DataService, 
    private storage: AngularFireStorage,
    private fb: FormBuilder) { 
    
    this.dataService.getAllAlbums().subscribe(albums => {
      // albums.map( album => {
      //   const ref75 = this.storage.ref(`Albums/thumb@75_${album.imageName}`);
      //   let thumb = ref75.getDownloadURL();
      //   thumb.subscribe( data => {
      //     album.thumb = data;
      //   })
      // })
      this.allAlbums = albums
      // console.log(albums);
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

