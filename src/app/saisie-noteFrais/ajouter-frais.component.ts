import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Prime } from '../models/Prime';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  //ICONE
  modifIcon = faPencilAlt;
  suprimeIcon = faTrashAlt;

  constructor(private gestionFraisService: GestionFraisService, private root: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.idNote = this.root.snapshot.paramMap.get('id');
    this.requestGetLigneFrais();
    this.requestPrime();

    this.gestionFraisService.requestGetNoteFraisById(this.idNote).subscribe
    (dataNote => { this.notefrais = dataNote;
   }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }


  // Permet de recuperer les lignes de frais d'une note de frais
  requestGetLigneFrais(): void {
    this.gestionFraisService.requestGetLigneFrais(this.idNote).subscribe
    (data => { this.listLignefrais = data;
               this.listLignefrais.forEach(value => value.montantEuros = value.montant / 100);
  }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }


  // Permet de recuperer le prime de la mission qui correspond à la note de frais choisie
  requestPrime(): void {
    this.gestionFraisService.requestGetPrime(this.idNote).subscribe
    (data => { this.primeMission = data;
    this.primeMission.forEach(value => value.montantEuros = value.montant / 100);

  }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }




  // ---- DEBUT - MISE EN PLACE DE LA MODALE ---
  closeResult = '';
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // Quand je clique sur ajouter, ça passe par ici
      console.log(this.ligneDeFrais)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('2');
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

  // ---- FIN - MISE EN PLACE DE LA MODALE ---

  valider(maLigneFrais){
    this.gestionFraisService.enregistrerLigneFrais(maLigneFrais).subscribe();
    }



}

