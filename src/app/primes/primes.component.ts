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

  //-----information de configuration du graphique-----//
  title = 'Primes année ';
  type = 'ColumnChart';
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Mois', 'Montant prime'];
  options = {
  };
  width = 650;
  height = 400;
  //-----------------------------------------------------//

  constructor(private authSrv: AuthService, private primesService: PrimesService) { }

  ngOnInit(): void {
    this.authSrv.collegueConnecteObs.subscribe(data => this.collegue = data);
    this.primesService.primes.asObservable().subscribe(data => {
      this.primes = data;
      this.primes.forEach((value) => {
        value.montantEuros = value.montant / 100;
      });
      this.loadPrimesMois();
    });
    this.primesService.annees.asObservable().subscribe(data => {
      this.annees = data;
    });
    this.annee = new Date().getFullYear();
    this.title = 'Primes année '+this.annee.toString();
    this.primesService.loadPrimes(this.collegue.email, "", this.annee);
    this.primesService.loadAnnees(this.collegue.email);
  }

  trierDate() {
    if (this.triDate == false) {
      this.primesService.loadPrimes(this.collegue.email, "false", new Date().getFullYear());
      this.triDate = true;
    } else {
      this.primesService.loadPrimes(this.collegue.email, "true", new Date().getFullYear());
      this.triDate = false;
    }
  }

  onChange(newObj) {
    this.annee = newObj;
    this.primesService.loadPrimes(this.collegue.email, "", this.annee);
    this.title = 'Primes année '+this.annee.toString();
  }

  loadPrimesMois(){
    let primesMois: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.primes.forEach(value => {
      let date = new Date(value.date_debut);
      if (date.getFullYear() == this.annee){
        primesMois[date.getMonth()] = primesMois[date.getMonth()] + value.montantEuros;
      }
    });
    this.data = [
      ['Janv.', primesMois[0]],
      ['Fev.', primesMois[1]],
      ['Mars', primesMois[2]],
      ['Avr.', primesMois[3]],
      ['Mai', primesMois[4]],
      ['Juin', primesMois[5]],
      ['Juil.', primesMois[6]],
      ['Aout', primesMois[7]],
      ['Sept.', primesMois[8]],
      ['Oct.', primesMois[9]],
      ['Nov.', primesMois[10]],
      ['Dec.', primesMois[11]]
    ];
  }

}
