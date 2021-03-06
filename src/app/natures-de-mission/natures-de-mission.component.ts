import { Router } from '@angular/router';
import { Nature } from './../models/Nature';
import { DataNatureService } from './../services/data-nature.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt, faTimes, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-natures-de-mission',
  templateUrl: './natures-de-mission.component.html',
  styleUrls: ['./natures-de-mission.component.scss']
})
export class NaturesDeMissionComponent implements OnInit {
  //Icônes
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt
  faCheck = faCheck
  faTimes = faTimes

  natures : Nature[]
  suppressionValide:boolean = false
  suppressionInvalide: boolean = false

 closeResult = '';

  constructor(private natureService : DataNatureService, private router : Router, private modalService: NgbModal) { }

    modifier(nature : Nature) {
    this.natureService.nature = nature;
    this.router.navigate(['/nature-modification'])
  }

    ajouter(){
      this.router.navigate(['/nature-creation'])
    }

    supprimer(nature : Nature) {
      this.natureService.supprimerNature(nature)
      setTimeout(() => {
        this.natureService.getNatures()
        this.modalService.dismissAll()
      }, 3000
      );
    }

  openSuppression(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result
      .then((result) => {
        this.suppressionInvalide = false
        this.suppressionValide = false
    }, (reason) => {
      this.suppressionInvalide = false
        this.suppressionValide = false
    });
      }

  ngOnInit(): void {
    this.natureService.abonnementNatures()
      .subscribe(data => this.natures = data)
    this.natureService.getNatures()

    this.natureService.natureSupprimer.asObservable().subscribe((data => {
      let temp : string = data
        if (temp == "La supression a bien été enregistrée" ) {
          this.suppressionValide = true
      } else {
        this.suppressionValide = false

      }

      console.log(this.suppressionValide)
      if (temp == "La nature est déjà utilisée, impossible de la supprimer" ) {
        this.suppressionInvalide = true
      } else {
        this.suppressionInvalide = false
      }
      console.log(this.suppressionInvalide)
    }))
  }

}
