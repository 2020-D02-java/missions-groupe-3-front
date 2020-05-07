import { Component, OnInit } from '@angular/core';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestion-frais',
  templateUrl: './gestion-frais.component.html',
  styleUrls: ['./gestion-frais.component.scss']
})
export class GestionFraisComponent implements OnInit {

  notefrais: NoteDeFrais[];

  //ICONE
  plusCircleIcon = faPlusCircle;

  constructor(private gestionFraisService: GestionFraisService) { }

  //utilisation de la methode requestGetFrais qui communique avec la base
  ngOnInit(): void {
    this.gestionFraisService.requestGetFrais().subscribe
    (data => { this.notefrais = data;
     console.log(data)
   }, (erreur: HttpErrorResponse) => console.log(`Erreur: ${erreur}`))};
}

