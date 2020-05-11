import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Nature } from '../models/NatureDto';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  natures = new Subject<Nature[]>();

  constructor(private _http: HttpClient) { }

  loadNatures() {
    this._http.get(environment.baseUrl + "natures").subscribe((data: Nature[]) => {
      this.natures.next(data);
    }, (error: any) => {
      console.log("erreur lors de la requete de chargement des natures");
    });
  }

  abonnementNatures(): Observable<Nature[]> {
    return this.natures.asObservable();
  }

}
