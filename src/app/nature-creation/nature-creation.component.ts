import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataNatureService } from './../services/data-nature.service';
import { NgForm } from '@angular/forms';
import { Nature } from './../models/Nature';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nature-creation',
  templateUrl: './nature-creation.component.html',
  styleUrls: ['./nature-creation.component.scss']
})
export class NatureCreationComponent implements OnInit {

  nature = new Nature("", null, "", null, null, null, null, null, null)
  validation: boolean = false;

  erreurPourcentage: boolean = false;
  erreurPlafondFrais: boolean = false;
  erreurNom: boolean = false
  erreurPlafondDepassable: boolean = false
  erreurFacturation: boolean = false
  erreurPrime: boolean = false
  erreurTjm: boolean = false

  factureMode: boolean;
  primeMode: boolean;

  @ViewChild(NgForm) myForm: NgForm

  constructor(private dataNatureService: DataNatureService, private router: Router) { }

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

    if (this.nature.plafondDepassable == null) {
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
        console.log(this.myForm.status)
        this.dataNatureService.creationNature(this.nature)
        this.validation = true
        this.myForm.resetForm()
        setTimeout(() => {
          this.validation = false
          this.router.navigate(['/natures-de-mission'])
        }, 3000);
    }
    console.log(this.myForm.status)


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

  facturation(value) {
    if (value == true) {
      this.erreurFacturation = false
      this.factureMode = true
    } else {
      this.factureMode = false
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

  plafondDepassable($event) {
    if ($event != null) {
      this.erreurPlafondDepassable = false
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
  }

}
