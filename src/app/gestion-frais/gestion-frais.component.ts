import { Component, OnInit } from '@angular/core';
import { GestionFraisService } from '../services/gestion-frais.service';
import { NoteDeFrais } from '../models/NoteDeFrais';

@Component({
  selector: 'app-gestion-frais',
  templateUrl: './gestion-frais.component.html',
  styleUrls: ['./gestion-frais.component.scss']
})
export class GestionFraisComponent implements OnInit {

  notefrais: NoteDeFrais[];

  constructor(private gestionFraisService: GestionFraisService) { }

  ngOnInit(): void {
    this.gestionFraisService.requestGetFrais().subscribe
    (data => { this.notefrais = data;
     console.log(data)
   }, err => { console.log(err)
   });
  }
}

