import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { AlbumModel } from 'src/app/models/album';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-remove-album',
  templateUrl: './remove-album.component.html',
  styleUrls: ['./remove-album.component.css']
})
export class RemoveAlbumComponent implements OnInit {

  allAlbums: AlbumModel[];
  @ViewChild(MatSort) sort: MatSort;

  images = { id: null, thumb: null };

  
  constructor(private dataService: DataService, private storage: AngularFireStorage) { 
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
    })
   }

  ngOnInit() {
    // this.getThumb()
    
  }
  
  
  
  getThumb(){
    this.allAlbums.map( async album => {
      
      const ref75 = await this.storage.ref(`Albums/thumb@75_${album.imageName}`);
      this.images[album.uid] = await ref75.getDownloadURL();
      
    })
    console.log(this.allAlbums);
    console.log(this.images);
    
  }
  


  
  
  delete(id: string, imageName) {
    console.log(id, imageName);
    
    // this.dataService.deleteAlbum(id, imageName);
  }
}
