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

  nature : Nature
  erreurPourcentage: boolean = false;
  erreurPlafondFrais: boolean = false;
  validation: boolean = false;

  factureMode: boolean;
  primeMode: boolean;

  factureModif: boolean
  primeModif: boolean

  @ViewChild(NgForm) myForm: NgForm


  constructor(private dataNatureService: DataNatureService, private router : Router) { }

  valider() {

    if (this.nature.pourcentage > 10) {
      this.erreurPourcentage = true
    } else {
      this.erreurPourcentage = false
    }

    if (this.nature.plafond <= 0) {
      this.erreurPlafondFrais = true
    } else {
      this.erreurPlafondFrais = false
    }

    if (this.erreurPourcentage == false && this.erreurPlafondFrais == false) {
      this.dataNatureService.modifierNature(this.nature)
      this.validation = true
      this.myForm.resetForm()
      setTimeout(() => {
        this.validation = false
        this.router.navigate(['/natures-de-mission'])
      }, 3000);
    }

  }

  facturation(value) {
    if (value == true) {
      this.factureMode = true
      this.factureModif = true
    } else {
      this.factureMode = null
      this.factureModif = null
      this.primeMode = false
    }
  }

  prime(value) {
    if (value == true) {
      this.primeMode = true
      this.primeModif = true
    } else {
      this.primeMode = false
      this.primeModif = false
    }
  }

  ngOnInit(): void {
    this.nature = this.dataNatureService.nature;

    if (this.nature.facturation == true || this.nature.prime == true) {
      this.primeModif = true
      this.factureModif = true
     } else {
      this.primeModif = false
      this.factureModif = false
     }
  }

}
