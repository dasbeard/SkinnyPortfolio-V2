import { Component } from '@angular/core';
import { LinkModel } from 'src/app/models/links';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-remove-link',
  templateUrl: './remove-link.component.html',
  styleUrls: ['./remove-link.component.css']
})
export class RemoveLinkComponent {

  allLinks: LinkModel[];
  
  constructor( private dataService: DataService ) {
    this.dataService.getAllLinks().subscribe(links => {      
      this.allLinks = links;
    })
   }

   
  deleteLink(id: string) {
    this.dataService.deleteLink(id);
  }

  updateLink(link){
    if(typeof link.date != 'string') {
      link.date = link.date.toISOString();
    }
    this.dataService.updateLink(link);
  }

}

