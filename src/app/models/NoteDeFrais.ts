import {  OnInit } from '@angular/core';


export class NoteDeFrais  implements OnInit {

  constructor(public idNote: string, public dateDebut: Date, public dateFin: Date,
    public nature: string, public depart: string,
    public arrivee: string, public transport: string, public frais: number, public fraisEuros: number){}

  ngOnInit(): void {
  }

}
