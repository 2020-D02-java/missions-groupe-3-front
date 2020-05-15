import { Router } from '@angular/router';
import { Nature } from './../models/Nature';
import { DataNatureService } from './../services/data-nature.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-natures-de-mission',
  templateUrl: './natures-de-mission.component.html',
  styleUrls: ['./natures-de-mission.component.scss']
})
export class NaturesDeMissionComponent implements OnInit {
  //Icônes
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt

  natures : Nature[]

  closeResult = ''

  constructor(private natureService : DataNatureService, private router : Router, private modalService: NgbModal) { }

    modifier(nature : Nature) {
    this.natureService.nature = nature;
    this.router.navigate(['/nature-modification'])
  }

  // openModification(content) {
  //   this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title'}).result
  // }

  ngOnInit(): void {
    this.natureService.abonnementNatures()
      .subscribe(data => this.natures = data)
    this.natureService.getNatures()

  }

}
