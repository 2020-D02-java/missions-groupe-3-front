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

  natureSaisie = new Nature("", null, "", null, null, null, null, null, null)
  erreurPourcentage: boolean = false;
  erreurPlafondFrais: boolean = false;
  validation: boolean = false;

  factureMode: boolean;
  primeMode: boolean;

  @ViewChild(NgForm) myForm: NgForm


  constructor(private dataNatureService: DataNatureService) { }

  valider() {

    if (this.natureSaisie.pourcentage > 10) {
      this.erreurPourcentage = true
    } else {
      this.erreurPourcentage = false
    }

    if (this.natureSaisie.plafond <= 0) {
      this.erreurPlafondFrais = true
    } else {
      this.erreurPlafondFrais = false
    }

    if (this.erreurPourcentage == false && this.erreurPlafondFrais == false) {
      this.dataNatureService.modifierNature(this.natureSaisie)
      this.validation = true
      this.myForm.resetForm()
      setTimeout(() => {
        this.validation = false
      }, 5000);
    }

  }

  facturation(value) {
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
