import { DataNatureService } from './../services/data-nature.service';
import { Nature } from './../models/Nature';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nature-mission-modification',
  templateUrl: './nature-mission-modification.component.html',
  styleUrls: ['./nature-mission-modification.component.scss']
})
export class NatureMissionModificationComponent implements OnInit {

  //natureSaisie:Nature;
  natureSaisie = new Nature("", null, "", null, null , null, null, null, null)
  erreurPourcentage : boolean = false;
  erreurPlafondFrais: boolean = false;

  factureMode:boolean;
  primeMode:boolean;


  constructor(private dataNatureService: DataNatureService ) { }

  valider(){
    console.log(this.natureSaisie)

    if (this.natureSaisie.primePourcentage > 10 ) {
      this.erreurPourcentage = true
    }

    if (this.natureSaisie.plafond <= 0) {
      this.erreurPlafondFrais = true
    }
    this.dataNatureService.modifierNature(this.natureSaisie)
  }

  facturation(value){
    if (value == true) {
      this.factureMode = true
    } else {
      this.factureMode = null
      this.primeMode = false
    }
  }

  prime(value) {
    if (value == true) {
      this.primeMode = true
    } else {
      this.primeMode = false
    }
  }

  ngOnInit(): void {

  }

}
