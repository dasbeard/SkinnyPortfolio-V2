import { Component, OnInit, OnDestroy } from '@angular/core';
import { LinkModel } from '../../models/links';

import { trigger, style, state } from '@angular/animations';
import { albumAnimationTransition } from 'src/app/animation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-links',
  templateUrl: './list-links.component.html',
  styleUrls: ['./list-links.component.css'],
  animations: [
    trigger('fadeIn', [
      state('for', style({}), {params: {timing1: 'timing'}}),
      albumAnimationTransition
    ])
  ]
})

export class ListLinksComponent implements OnInit, OnDestroy {

  allLinks: LinkModel[];
  timing: string = '.05s';
  animate: boolean = false;
  
  constructor( private dataService: DataService) {
    this.animate = this.dataService.initialLinks;
   }

  ngOnInit() {
    this.dataService.getAllLinks().subscribe(links => {
      this.allLinks = links;
    })
  }

  ngOnDestroy() {
    this.dataService.initialLinks = true;
  }

}
