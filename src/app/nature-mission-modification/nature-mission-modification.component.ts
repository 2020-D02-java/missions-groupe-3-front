import { Nature } from './../models/Nature';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nature-mission-modification',
  templateUrl: './nature-mission-modification.component.html',
  styleUrls: ['./nature-mission-modification.component.scss']
})
export class NatureMissionModificationComponent implements OnInit {

  nature:Nature = new Nature("", undefined, "", undefined, "", "", undefined, null, null)

  constructor() { }

  ngOnInit(): void {
  }

}
