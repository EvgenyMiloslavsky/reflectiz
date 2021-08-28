import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: '<div fxLayoutAlign="center start"><img src="assets/images/Reflectiz-comp-illustration-SVG_4.svg" alt="Reflectiz Home" >\n</div>',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
