import {  OnInit } from '@angular/core';


export class NoteDeFrais  implements OnInit {

  constructor(private dateDebut: Date, private dateFin: Date,
    private nature: string, private depart: string,
    private arrivee: string, private transport: string, private frais: number){}

  ngOnInit(): void {
  }

}
