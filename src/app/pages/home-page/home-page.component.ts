import { Component, OnInit } from '@angular/core';
import { AlbumModel } from '../../models/album';
import { trigger, style, state } from '@angular/animations';
import { albumAnimationTransition, fadeIn, fade } from '../../animation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [

    // trigger('fadeIn', [
    //   state('for', style({}), {params: {timing1: 'timing'}}),
    //   albumAnimationTransition
    // ])

    // fade

  ]
})

export class HomePageComponent implements OnInit {

    allAlbums: AlbumModel[];
    animate:boolean = false;
    timing:string = '.2s';
    // timing:string = '1.2s';

  constructor( private dataService: DataService) {
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
      if(this.dataService.initialHome || this.dataService.isHandset) {
        this.timing = '0.5s'
      }
    })
   }

  ngOnInit() {
  }

}
