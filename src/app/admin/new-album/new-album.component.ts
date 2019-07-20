import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  FormArray
 } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  // For Image Preview
  @ViewChild("albumCover") albumCover;
  selectedFile: File = null;
  image = null;
  reader;

  // Upload Progress Bar
  showProgressBar: boolean = false;
  uploadPercent: Observable<number>;

  newAlbum: FormGroup;

  get moreCredits() {
    return this.newAlbum.get("moreCredits") as FormArray;
  }

  addCredit() {
    if(this.newAlbum.value.moreCredits.length > 0){
      let last = this.newAlbum.value.moreCredits[this.newAlbum.value.moreCredits.length -1].replace(/\s/g,'');
      if (last === ''){
        return
      } else {
        this.moreCredits.push(this.fb.control(""));
      }
    } else {
      this.moreCredits.push(this.fb.control(""));
    }
  }

  removeCredit(index: number): void {
    const arrayControl = <FormArray>this.newAlbum.controls['moreCredits'];
    arrayControl.removeAt(index);
  }
  
  
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // !! Fix Error when using validator for max/min length
    this.newAlbum = this.fb.group({
      artist: ["", Validators.required],
      album: ["", Validators.required],
      year: ["", Validators.required],
      credits: ["", Validators.required],
      spotify: ["", Validators.required],
      image: ["", Validators.required],
      moreCredits: this.fb.array([])
    })
  }
  
  imagePreview(event) {
    this.selectedFile = event.target.files[0];
    this.reader = new FileReader();
    this.reader.onload = e => {
      this.albumCover.nativeElement.src = e.target["result"];
    };
    this.reader.readAsDataURL(event.target.files[0]);

  }

  onSubmit(fromData, formDirective: FormGroupDirective): void {
    this.showProgressBar = true;

    let uploadAlbum = {
      artist: this.newAlbum.value.artist,
      album: this.newAlbum.value.album,
      year: this.newAlbum.value.year,
      spotify: this.newAlbum.value.spotify,
      image: this.selectedFile,
      credits: []
    };

    let tempCredits = [this.newAlbum.value.credits];
    let tempCredits2 = this.validateLastCredit(this.newAlbum.value.moreCredits);

    if(tempCredits2){
      uploadAlbum.credits = [...tempCredits, ...tempCredits2];
    } else {
      uploadAlbum.credits = tempCredits;
    }

    this.dataService.uploadAlbum(uploadAlbum);
    this.dataService.uploadPercent.subscribe(data => {
    // console.log(data);

      this.uploadPercent = this.dataService.uploadPercent;
      // console.log(this.uploadPercent);

    if (data === 100) {
      setTimeout(() => {
        this.openSnackBar();
      }, 900);
    
      }
    });
    
    // let uploadComplete = this.dataService.uploadComplete;
    // console.log(uploadComplete);
    

    this.removeAllCredits(tempCredits2);
    formDirective.resetForm();
    this.reader = false;
  }

  removeAllCredits(creditsArray) {
    if(creditsArray) {
      for (let i in creditsArray) {
        this.removeCredit(creditsArray[i]);
      }

      this.removeCredit(creditsArray[0]);
    } else {
      return
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

  openSnackBar() {
    this.snackBar.openFromComponent(uploadSnackBar, {
      duration: 900
    })
  }
}


@Component({
  selector: "uploadSnackBar",
  template: `
    <p class="snackBar">
      Upload Success
    </p>
  ` ,
  styles: [
    `.snackBar {
      color: hotpink;
      text-align: center;
      margin: 0;
      padding: 0;
    }`
  ]
  
})
export class uploadSnackBar {}
