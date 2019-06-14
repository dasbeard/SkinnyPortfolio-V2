import { Component, Input } from '@angular/core';
import { AlbumModel } from '../../models/album'
import { fade } from 'src/app/animation';

export interface DialogData {
  album : AlbumModel
}

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.css'],
  animations: [
    fade
  ]
})
export class DisplayAlbumComponent {

  @Input() albumInfo: AlbumModel

  constructor() { }

}
