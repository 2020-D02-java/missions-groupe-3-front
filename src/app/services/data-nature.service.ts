import { environment } from './../../environments/environment';
import { Nature } from './../models/Nature';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataNatureService {

  natures = new Subject<Nature[]>();
  natureModifiee = new Subject<string>();
  nature: Nature;

  constructor( private _http: HttpClient) { }

  // abonnementNatures(): Observable<Nature[]> {
  //   return this.natures.asObservable();
  // }

  modifierNature(nature : Nature) {
    this._http.patch<string>(environment.baseUrl + "natures/modification", nature).subscribe((data: string) => {
      console.log("Modification ok")
      this.natureModifiee.next(data)
    }, (error:any) => {
      console.log("erreur lors de la modification");
    })
  }



}
