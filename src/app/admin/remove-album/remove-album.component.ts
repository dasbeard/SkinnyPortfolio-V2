import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { AlbumModel } from 'src/app/models/album';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-remove-album',
  templateUrl: './remove-album.component.html',
  styleUrls: ['./remove-album.component.css']
})
export class RemoveAlbumComponent implements OnInit {

  allAlbums: AlbumModel[];
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["cover", "artist", "album", "year", "delete"];
  
  constructor(private dataService: DataService) { 
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
    })

   }

  ngOnInit() {
  }

  delete(id: string, imageName) {
    // console.log(imageName);
    
    this.dataService.deleteAlbum(id, imageName);
  }

}
