import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css','../common-css.css']
})
export class SalesComponent implements OnInit {
  viewMode="showProductForm";
  constructor() { }

  ngOnInit(): void {
  }

}
