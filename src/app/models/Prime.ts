import {  OnInit } from '@angular/core';
import { Nature } from './NatureDto';


export class Prime  implements OnInit {

  constructor(public id: number, public date_debut: Date, public date_fin: Date, public montant: number, public montantEuros: number, public annee: number, public nature: Nature){}

  ngOnInit(): void {
  }

}
