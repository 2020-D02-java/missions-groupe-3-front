import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Prime } from '../models/Prime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-ajouter-frais',
  templateUrl: './ajouter-frais.component.html',
  styleUrls: ['./ajouter-frais.component.scss']
})
export class AjouterFraisComponent implements OnInit {

  notefrais: NoteDeFrais[];
  listLignefrais: LigneDeFrais[];
  primeMission: Prime[];
  idNote: string;
  ligneDeFrais: LigneDeFrais = new LigneDeFrais();


  //valider
  ligneFraisForm: FormGroup;
  selectedLigneFrais: LigneDeFrais;
  operation: string= 'add';

  dateFormat;
  erreur_date: boolean = false;
  erreur_montant: boolean = false;
  erreur_disponnibilite: boolean = false;



  //ICONE
  modifIcon = faPencilAlt;
  suprimeIcon = faTrashAlt;

  constructor(private gestionFraisService: GestionFraisService, private root: ActivatedRoute, private modalService: NgbModal, private formB: FormBuilder) {
  }

  ngOnInit(): void {
    this.idNote = this.root.snapshot.paramMap.get('id');
    this.requestGetLigneFrais();
    this.requestPrime();

    this.gestionFraisService.requestGetNoteFraisById(this.idNote).subscribe
      (dataNote => {
        this.notefrais = dataNote;
      }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`));
  }


  // Permet de recuperer les lignes de frais d'une note de frais
  requestGetLigneFrais(): void {
    this.gestionFraisService.requestGetLigneFrais(this.idNote).subscribe(
      data => { this.listLignefrais = data;
                 this.listLignefrais.forEach(value => value.montantEuros = value.montant / 100); },
      error => { console.log('Un erreur à été détecté.')},
      () => { console.log('Le telechargement a été éffectué.')}
      );
      }


  // Permet de recuperer le prime de la mission qui correspond à la note de frais choisie
  requestPrime(): void {
    this.gestionFraisService.requestGetPrime(this.idNote).subscribe
      (data => {
        this.primeMission = data;
        this.primeMission.forEach(value => value.montantEuros = value.montant / 100);

      }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`));
  }

  // valider(maLigneFrais) {
  //   //la date de debut doit etre entre la date de debut et fin de la mission
  //   // if (maLigneFrais.date != null && (this.mission.date_debut <= maLigneFrais.date) && (this.mission.date_fin >= maLigneFrais.date)) {
  //   //   this.erreur_date = false;
  //   // } else {
  //   //   this.erreur_date = true;
  //   // }
  //   //Le montant de la ligne de frais est strictement positif
  //   if (maLigneFrais.montant > 0) {
  //     this.erreur_montant = false;
  //   } else {
  //     this.erreur_montant = true;
  //   }
  //   //On ne peut pas saisir 2 lignes de frais identifiques (même couple date/nature)
  //   this.gestionFraisService.disponibiliteLigneFrais.subscribe(data => {
  //     if (data == 'true') {
  //       this.erreur_disponnibilite = true;
  //     } else {
  //     this.erreur_disponnibilite = false;
  //     }
  //   })
  //   this.gestionFraisService.verifierDisponibilite(maLigneFrais.date, maLigneFrais.nature);
  //   this.gestionFraisService.enregistrerLigneFrais(maLigneFrais).subscribe();
  // }

  creationForm(){
    this.ligneFraisForm = this.formB.group({
      date: ['', Validators.required],
      montant: '',
      type: '',
    });
  }
  initLigneFrais(){
    this.selectedLigneFrais = new LigneDeFrais();
    this.creationForm();
  }


  valider() {
    const ligneSaisie = this.ligneFraisForm.value;
    this.gestionFraisService.enregistrerLigneFrais(ligneSaisie).subscribe(
      res => {
        this.initLigneFrais();
        this.requestGetLigneFrais();
        // close.modal;
      }
    );
  }





  chekmontant(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value >0) {
            resolve({ emailIsTaken: true })
        } else {resolve(null)}
      }, 2000)
    })
}


// config modal (!!!)
closeResult = '';
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}



