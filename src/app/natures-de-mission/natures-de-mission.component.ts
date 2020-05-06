import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-natures-de-mission',
  templateUrl: './natures-de-mission.component.html',
  styleUrls: ['./natures-de-mission.component.scss']
})
export class NaturesDeMissionComponent implements OnInit {

  //Icônes
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt

  constructor() { }

  ngOnInit(): void {
  }

}
