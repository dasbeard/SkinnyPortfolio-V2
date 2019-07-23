import { Component, Input } from '@angular/core';
import { AlbumModel } from '../../models/album'
import { fade } from 'src/app/animation';
import { DataService } from 'src/app/services/data.service';

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
  images:Object;

  constructor(private dataservice: DataService) { 

  }
  

}
