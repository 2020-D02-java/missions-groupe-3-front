import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Prime } from '../models/Prime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-ajouter-frais',
  templateUrl: './ajouter-frais.component.html',
  styleUrls: ['./ajouter-frais.component.scss']
})
export class AjouterFraisComponent implements OnInit {

  notefrais: NoteDeFrais;
  listLignefrais: LigneDeFrais[];
  primeMission: Prime;
  idNote: string;
  ligneDeFrais: LigneDeFrais = new LigneDeFrais();


  //valider
  ligneFraisForm = new FormGroup({
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required)
  });

  selectedLigneFrais: LigneDeFrais;
  operation: string = 'add';


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

    this.gestionFraisService.requestGetNoteFraisById(this.idNote).subscribe
      (data => {
        this.notefrais = data;
      }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`));

    this.requestGetLigneFrais();
    this.requestPrime();
  }


  // Permet de recuperer les lignes de frais d'une note de frais
  requestGetLigneFrais(): void {
    this.gestionFraisService.requestGetLigneFrais(this.idNote).subscribe(
      data => {
        this.listLignefrais = data;
        // console.log(data[0].id);
        this.listLignefrais.forEach(value => value.montantEuros = value.montant / 100);
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

  valider() {

    let noErrors = true;
    // this.idNote = this.root.snapshot.paramMap.get('id');
    const ligneSaisie = this.ligneFraisForm.value;
    ligneSaisie.date = moment(this.ligneFraisForm.value.date).subtract(1, 'M').format('YYYY-MM-DD');
    if (ligneSaisie.date != null && (this.notefrais.dateDebut <= ligneSaisie.date) && (this.notefrais.dateFin >= ligneSaisie.date)) {
      this.erreur_date = false;
      console.log('goood');
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



    if (noErrors)
    {
      const body = {
        date: ligneSaisie.date  + '',
        type: this.ligneFraisForm.get('type').value + '',
        montant: this.ligneFraisForm.get('montant').value,
        note_de_frais: this.idNote

      };

      this.gestionFraisService.enregistrerLigneFrais(body).subscribe(
        res => {
          error: error => console.error('There was an error!', error);
        }
      );
      alert("Ligne de Frais ajoutée !");
      location.reload();
    }

  }








  // config modal (!!!)
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


}



