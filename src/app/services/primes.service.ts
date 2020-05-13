import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prime } from '../models/Prime';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimesService {

  primes = new Subject<Prime[]>();
  annees = new Subject<number[]>();

  constructor(private _http: HttpClient) { }

  loadPrimes(email: string, tri_date: string, annee: number){
    this._http.get<Prime[]>(environment.baseUrl + "prime/collegue?email="+email+"&tri_date="+tri_date+"&annee="+annee).subscribe((data:Prime[])=> {
      this.primes.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

  loadAnnees(email: string){
    this._http.get<number[]>(environment.baseUrl + "prime/annees?email="+email).subscribe((data: number[])=> {
      this.annees.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

}
