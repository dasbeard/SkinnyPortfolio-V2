import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroupDirective,
  FormGroup,
  Validators
} from '@angular/forms';
import { LinkModel } from '../../models/links'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.css']
})
export class NewLinkComponent implements OnInit {

  newLink: FormGroup;
  allLinks: LinkModel[];

  startDate = new Date(2000, 0, 1);


  constructor( 
    private fb: FormBuilder, 
    private dataService: DataService) { }

  ngOnInit() {
    this.newLink = this.fb.group({
      url: ["", Validators.required],
      title: ["", Validators.required],
      date: [Validators.required]
    })
  }

  onSubmit(newLink, formDirective: FormGroupDirective): void {
    // console.log(newLink.value.date.toISOString())
    // console.log(newLink.value);
    newLink.value.date = newLink.value.date.toISOString();

    this.dataService.addNewLink(newLink.value);
    formDirective.resetForm();
  }

}
