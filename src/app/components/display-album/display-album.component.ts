import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"
import { AlbumModel } from '../../models/album'

export interface DialogData {
  album : AlbumModel
}

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.css']
})
export class DisplayAlbumComponent implements OnInit {

  @Input() albumInfo: AlbumModel

  constructor( public dialog:MatDialog ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AlbumDialog, {
      minWidth: "50%",
      maxWidth: "75%",
      // maxHeight: "55vh",
      data: {
        album: this.albumInfo
      }
    });
  }

}


@Component({
  selector: "album-dialog",
  templateUrl: "./album-dialog.html",
  styleUrls: ["./album-dialog.css"]
})
export class AlbumDialog {
  constructor(
    public dialogRef: MatDialogRef<AlbumDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
