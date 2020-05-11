import {  OnInit } from '@angular/core';


export class Prime  implements OnInit {

  constructor(public id: number, public date: Date, public montant: number, public montantEuros: number){}

  ngOnInit(): void {
  }

}
