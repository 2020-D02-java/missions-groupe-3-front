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
  natureCreation = new Subject<string>();
  nature: Nature;

  constructor(private _http: HttpClient) { }

  // abonnementNatures(): Observable<Nature[]> {
  //   return this.natures.asObservable();
  // }

  modifierNature(nature: Nature) {
    this._http.patch<string>(environment.baseUrl + "natures/modification", nature)
      .subscribe((data: string) => {
        console.log("Modification ok")
        this.natureModifiee.next(data)
      }, (error: any) => {
        console.log("erreur lors de la modification");
      })
  }

  creationNature(nature: Nature) {
    this._http.post<string>(environment.baseUrl + "natures/ajout", nature)
      .subscribe((data : string) => {
        console.log("Création ok")
        this.natureCreation.next(data)
      }, (error:any) => {
        console.log("erreur lors de la création")
      })
  }



}
