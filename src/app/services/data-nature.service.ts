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
  natureSupprimer = new Subject<string>();
  nature: Nature;

  msgSuccess: string
  msgError: string

  constructor( private _http: HttpClient) { }

  abonnementNatures(): Observable<Nature[]> {
    return this.natures.asObservable();
  }

  getNatures(){
    this._http.get<Nature[]>(environment.baseUrl + "natures")
      .subscribe((data:Nature[]) => {
        this.natures.next(data)
      }, (err:any) => {
      console.log(err)
      }
    )
  }

  modifierNature(nature : Nature) {
    this._http.patch<string>(environment.baseUrl + "natures/modification", nature).subscribe((data: string) => {
      console.log("Modification ok")
      this.natureModifiee.next(data)
    }, (err:any) => {
      console.log(err)
    })
  }

  supprimerNature(nature : Nature){
    this._http.delete<string>(environment.baseUrl + "natures/delete?id=" + nature.id).subscribe((data:string) => {
      this.natureSupprimer.next(data)
      console.log(data)
    }, (err:any) => {
      console.log(err);
    })
  }



}
