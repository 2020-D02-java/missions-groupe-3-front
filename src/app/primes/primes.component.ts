import { Component, OnInit } from '@angular/core';
import { Prime } from '../models/Prime';
import { PrimesService } from '../services/primes.service';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

  collegue: Collegue;
  primes: Prime[];
  triDate: boolean = false;
  annees: number[];
  annee: number;

  constructor(private authSrv: AuthService, private primesService: PrimesService) { }

  ngOnInit(): void {
    this.authSrv.collegueConnecteObs.subscribe(data => this.collegue = data);
    this.primesService.primes.asObservable().subscribe(data => {
      this.primes = data;
      this.primes.forEach((value) => {
        value.montantEuros = value.montant/100;
      });
    });
    this.primesService.annees.asObservable().subscribe(data => {
      this.annees = data;
    });
    this.annee = new Date().getFullYear();
    this.primesService.loadPrimes(this.collegue.email, "", this.annee);
    this.primesService.loadAnnees(this.collegue.email);
  }

  trierDate(){
    if (this.triDate == false){
    this.primesService.loadPrimes(this.collegue.email, "false", new Date().getFullYear());
      this.triDate = true;
    }else {
      this.primesService.loadPrimes(this.collegue.email, "true", new Date().getFullYear());
      this.triDate = false;
    }
  }

  onChange(newObj){
    this.annee = newObj;
    this.primesService.loadPrimes(this.collegue.email, "", this.annee);
  }

}
