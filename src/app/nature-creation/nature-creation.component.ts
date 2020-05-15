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

  nature = new Nature("", null, "", null, null, null, null, null, null )
  erreurPourcentage: boolean = false;
  erreurPlafondFrais: boolean = false;
  validation: boolean = false;

  factureMode: boolean;
  primeMode: boolean;

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
      this.dataNatureService.creationNature(this.nature)
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
