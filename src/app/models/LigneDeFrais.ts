import {  OnInit } from '@angular/core';


export class LigneDeFrais  implements OnInit {

  constructor(public date: Date, public nature: string, public montant: number, public montantEuros: number){}

  ngOnInit(): void {
  }

}
