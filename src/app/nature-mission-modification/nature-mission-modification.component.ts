import { Router } from '@angular/router';
import { DataNatureService } from './../services/data-nature.service';
import { Nature } from './../models/Nature';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nature-mission-modification',
  templateUrl: './nature-mission-modification.component.html',
  styleUrls: ['./nature-mission-modification.component.scss']
})
export class NatureMissionModificationComponent implements OnInit {


  nature = new Nature(null, "", null, "", null, null, null, null, null, null)

  erreurPourcentage: boolean = false;
  erreurPlafondFrais: boolean = false;
  erreurNom: boolean = false
  erreurPlafondDepassable: boolean = false
  erreurFacturation: boolean = false
  erreurPrime: boolean = false
  erreurTjm: boolean = false


  validation: boolean = false;

  factureMode: boolean;
  primeMode: boolean;

  factureModif: boolean
  primeModif: boolean

  @ViewChild(NgForm) myForm: NgForm


  constructor(private dataNatureService: DataNatureService, private router : Router) { }

  valider() {

    if (this.nature.prime == true && this.nature.pourcentage == null) {
      this.erreurPourcentage = true
    } else {
      this.erreurPourcentage = false
    }

    if (this.nature.pourcentage > 10) {
      this.erreurPourcentage = true
    } else {
      this.erreurPourcentage = false
    }

    if (this.nature.plafond <= 0 || this.nature.plafond == null) {
      this.erreurPlafondFrais = true
    } else {
      this.erreurPlafondFrais = false
    }

    if (this.nature.plafond <= 0 || this.nature.plafond == null) {
      this.erreurPlafondFrais = true
    } else {
      this.erreurPlafondFrais = false
    }

    if (this.nature.plafond_depassable == null) {
      this.erreurPlafondDepassable = true
    } else {
      this.erreurPlafondDepassable = false
    }

    if (this.nature.nom == "") {
      this.erreurNom = true
    } else {
      this.erreurNom = false
    }

    if (this.nature.facturation == null) {
      this.erreurFacturation = true
    } else {
      this.erreurFacturation = false
    }
    if (this.nature.facturation == true && this.nature.tjm == "") {
      this.erreurTjm = true
    } else {
      this.erreurTjm = false
    }

    if (this.nature.prime == null) {
      this.erreurPrime = true
    } else {
      this.erreurPrime = false
    }

    if (this.erreurPourcentage == false
      && this.erreurPlafondFrais == false
      && this.erreurTjm == false
      && this.erreurNom == false
      && this.erreurFacturation == false
      && this.erreurPlafondDepassable == false
      && this.erreurPrime == false) {
      this.dataNatureService.modifierNature(this.nature)
      this.validation = true
      this.myForm.resetForm()
      setTimeout(() => {
        this.validation = false
        this.router.navigate(['/natures-de-mission'])
      }, 3000);
    }
  }

  inputNom($event){
    if ($event != "") {
      this.erreurNom = false
    }
  }
  inputTjm($event){
    if ($event != "") {
      this.erreurTjm = false
    }
  }
  inputPourcentage($event){
    if ($event != null) {
      this.erreurPourcentage = false
    } else if ($event > 10) {
      this.erreurPourcentage = true
    }
  }
  inputPlafond($event){
    if ($event != null) {
      this.erreurPlafondFrais = false
    }
  }

  plafondDepassable($event) {
    if ($event != null) {
      this.erreurPlafondDepassable = false
    }
  }

  facturation(value) {
    if (value == true) {
      this.erreurFacturation = false
      this.factureMode = true
      this.factureModif = true
    } else {
      this.factureMode = null
      this.factureModif = null
      this.primeMode = false
      this.primeModif = false

      this.nature.prime = false
      this.nature.pourcentage = null
      this.nature.tjm = null
    }
  }

  prime(value) {
    if (value == true) {
      this.primeMode = true
      this.primeModif = true
    } else {
      this.primeMode = false
      this.primeModif = false
      this.nature.pourcentage = null
    }
  }

  annuler(){
    this.myForm.reset()
    this.erreurPourcentage = false;
    this.erreurPlafondFrais = false;
    this.erreurNom = false
    this.erreurPlafondDepassable = false
    this.erreurFacturation = false
    this.erreurPrime = false
    this.erreurTjm = false
  }

  ngOnInit(): void {
    this.nature = this.dataNatureService.nature;

    if (this.nature.facturation == true) {
      this.factureModif = true
     } else {
      this.factureMode = false
     }

     if (this.nature.prime == true) {
       this.primeModif = true
     } else {
       this.primeMode = false
     }



  }

}
