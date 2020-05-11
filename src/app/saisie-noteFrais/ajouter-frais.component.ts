import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Prime } from '../models/Prime';

@Component({
  selector: 'app-ajouter-frais',
  templateUrl: './ajouter-frais.component.html',
  styleUrls: ['./ajouter-frais.component.scss']
})
export class AjouterFraisComponent implements OnInit {

  notefrais: NoteDeFrais[];
  lignefrais: LigneDeFrais[];
  primeMission: Prime[];
  idNote: string;

  //ICONE
  modifIcon = faPencilAlt;
  suprimeIcon = faTrashAlt;

  constructor(private gestionFraisService: GestionFraisService, private root: ActivatedRoute) { }

  ngOnInit(): void {

    this.idNote = this.root.snapshot.paramMap.get('id');
    this.requestGetLigneFrais();
    this.requestPrime();

    this.gestionFraisService.requestGetNoteFraisById(this.idNote).subscribe
    (dataNote => { this.notefrais = dataNote;
   }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }

  requestGetLigneFrais(): void {

    this.gestionFraisService.requestGetLigneFrais(this.idNote).subscribe
    (data => { this.lignefrais = data;
               this.lignefrais.forEach(value => value.montantEuros = value.montant / 100);
  }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }

  requestPrime(): void {

    this.gestionFraisService.requestGetPrime(this.idNote).subscribe
    (data => { this.primeMission = data;
    this.primeMission.forEach(value => value.montantEuros = value.montant / 100);

  }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`)); }
}

