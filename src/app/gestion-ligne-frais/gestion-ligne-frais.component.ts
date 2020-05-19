import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Prime } from '../models/Prime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-gestion-ligne-frais',
  templateUrl: './gestion-ligne-frais.component.html',
  styleUrls: ['./gestion-ligne-frais.component.scss']
})
export class GestionLigneFraisComponent implements OnInit {

  notefrais: NoteDeFrais;
  listLignefrais: LigneDeFrais[];
  primeMission: Prime;
  idNote: string;
  idLigne: number;
  ligneDeFrais: LigneDeFrais = new LigneDeFrais();
  ligneDeFraisASupprimer: LigneDeFrais;

  erreur_date: boolean = false;
  erreur_montant: boolean = false;
  erreur_disponnibilite: boolean = false;


  erreur_date_modif: boolean = false;
  erreur_montant_modif: boolean = false;
  erreur_disponnibilite_modif: boolean = false;

  datePicked = { "year": 2000, "month": 5, "day": 7 };

  //Formulaire à valider
  ligneFraisForm = new FormGroup({
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required)
  });

  ligneFraisModForm = new FormGroup({
    dateModif: new FormControl('', Validators.required),
    typeModif: new FormControl('', Validators.required),
    montantModif: new FormControl('', Validators.required)
  });



  //ICONE
  modifIcon = faPencilAlt;
  suprimeIcon = faTrashAlt;

  constructor(private gestionFraisService: GestionFraisService, private root: ActivatedRoute,
    private modalService: NgbModal, private formB: FormBuilder) {
  }

  ngOnInit(): void {
    this.idNote = this.root.snapshot.paramMap.get('idOfNote');
    // console.log("id Of Note" + this.idNote);
    this.gestionFraisService.requestGetNoteFraisById(this.idNote).subscribe
      (data => { this.notefrais = data; },
        (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`));

    this.requestGetLigneFrais();
    this.requestPrime();
  }


  // Permet de recuperer les lignes de frais d'une note de frais
  requestGetLigneFrais(): void {
    this.gestionFraisService.requestGetLigneFrais(this.idNote).subscribe(
      data => {
        this.listLignefrais = data;
        let i;
        for (i = 0; i < data.length; i++) {
          this.listLignefrais[i].montantEuros = this.listLignefrais[i].montant / 100;
        }
        // this.listLignefrais.forEach(value => this.listLignefrais.montantEuros = value.montant / 100);
      },
      error => { console.log('Un erreur à été détecté.') },
      () => { console.log('Le telechargement des lignes a été éffectué.') }
    );

  }


  // Permet de recuperer le prime de la mission qui correspond à la note de frais choisie
  requestPrime(): void {

    this.gestionFraisService.requestGetPrime(this.idNote).subscribe
      (data => {
        this.primeMission = data;
        this.primeMission.montantEuros = this.primeMission.montant / 100;

      }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`));
  }



  get natureLigne(): any {
    return this.ligneFraisForm.get('type');
  }

  get dateligne(): any {
    return this.ligneFraisForm.get('date');
  }

  // Règles metiers appliquées sur les chamqps de saisie d'une ligne de frais
  valider() {

    let noErrors = true;
    const ligneSaisie = this.ligneFraisForm.value;
    ligneSaisie.date = moment(this.ligneFraisForm.value.date).subtract(1, 'M').format('YYYY-MM-DD');

    if (ligneSaisie.date != null && (this.notefrais.dateDebut <= ligneSaisie.date) && (this.notefrais.dateFin >= ligneSaisie.date)) {
      this.erreur_date = false;
    } else {
      noErrors = false;
      this.erreur_date = true;
    }

    const nature = this.ligneFraisForm.get('type').value;
    console.log('nature' + nature);
    if (nature != undefined) {
      let dispo = 'true';
      this.listLignefrais.forEach(element => {
        if (element.type === ligneSaisie.type && element.date === ligneSaisie.date) {
          dispo = 'false';
        }
      });
      if (dispo === 'false') {
        noErrors = false;
        this.erreur_disponnibilite = true;
      } else {
        this.erreur_disponnibilite = false;

      }
    }
    const montant = this.ligneFraisForm.get('montant').value;
    if (montant != undefined) {
      if (montant > 0) {
        this.erreur_montant = false;
      } else {
        noErrors = false;
        this.erreur_montant = true;
      }
    }
    if (noErrors) {
      const body = {
        date: ligneSaisie.date + '',
        type: this.ligneFraisForm.get('type').value + '',
        montant: this.ligneFraisForm.get('montant').value,
        note_de_frais: this.idNote

      };

      this.gestionFraisService.enregistrerLigneFrais(body).subscribe(
        res => {
          (error: any) => {  console.log("erreur lors de l'ajout d'une note de frais"); }
        });
      alert("Ligne de Frais ajoutée !");
      location.reload();
    }

  }
  // config modal valider
  closeResult = '';
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.valider();
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
  // fin modal

  get dateModifLigne(): any {
    return this.ligneFraisModForm.get('dateModif');
  }

  get natureModifLigne(): any {
    return this.ligneFraisModForm.get('typeModif');
  }

  //Changement de format de date pour la modification d'une ligne de frais
  fillFormModif(ligne: LigneDeFrais) {
    this.idLigne = ligne.id;
    const dateS = ligne.date + '';
    this.datePicked.year = parseInt(dateS.split('-')[0], 10);
    this.datePicked.month = parseInt(dateS.split('-')[1], 10);
    this.datePicked.day = parseInt(dateS.split('-')[2], 10);
    console.log("foo1111" + this.datePicked);
    this.ligneFraisModForm.setValue({
      dateModif: this.datePicked,
      typeModif: ligne.type,
      montantModif: ligne.montantEuros
    });
    console.log("baro" + this.ligneFraisModForm.value.dateModif);
  }


  // Modification d'une ligne de frais
  validerModif() {

    let noErrors = true;
    const ligneSaisieModif = this.ligneFraisModForm.value;
    ligneSaisieModif.dateModif = moment(this.ligneFraisModForm.value.dateModif).subtract(1, 'M').format('YYYY-MM-DD');
    console.log("fooo" + ligneSaisieModif.dateModif);
    if (ligneSaisieModif.dateModif != null && (this.notefrais.dateDebut <= ligneSaisieModif.dateModif) && (this.notefrais.dateFin >= ligneSaisieModif.dateModif)) {
      this.erreur_date_modif = false;
    } else {
      noErrors = false;
      this.erreur_date_modif = true;
    }

    const montant = this.ligneFraisModForm.get('montantModif').value;
    if (montant != undefined) {
      if (montant > 0) {
        this.erreur_montant_modif = false;
      } else {
        noErrors = false;
        this.erreur_montant_modif = true;
      }
    }
    if (noErrors) {
      const body = {
        date: ligneSaisieModif.dateModif + '',
        type: this.ligneFraisModForm.get('typeModif').value + '',
        montant: this.ligneFraisModForm.get('montantModif').value,
        note_de_frais: this.idNote,
        id: this.idLigne
      };
      console.log("bodyyyyyy" + body);

      this.gestionFraisService.modifierLigneFrais(body).subscribe(
        res => {
          (error: any) => {
            console.log("erreur lors de la modification de la note de frais");
          }
        });
      alert("Ligne de Frais modifiée !");
      location.reload();
    }

  }

  // config modal modification
  closeResult1 = '';
  open1(contentModification) {
    this.modalService.open(contentModification, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult1 = `Closed with: ${result}`;
      this.validerModif();
    }, (reason) => {
      this.closeResult1 = `Dismissed ${this.getDismissReason1(reason)}`;
    });
  }

  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // fin modal


  // Recuperation de la ligne de frais  pret à etre supprimer
  deleteLigne(ligne: LigneDeFrais) {
    this.idLigne = ligne.id;
    this.ligneDeFraisASupprimer = ligne;
    console.log("id a supprimer " + this.idLigne);
  }
  // Suppression d'une ligne de frais
  validerSuppression() {
    this.gestionFraisService.suprimerLigneFrais(this.idLigne).subscribe(
      res => {
        (error: any) => {
          alert("erreur lors de la suppression de la note de frais");
        }
      });
    alert("Ligne de Frais supprimée !");
    location.reload();
  }
}


