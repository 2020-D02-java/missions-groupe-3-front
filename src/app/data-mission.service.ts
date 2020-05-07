import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataMissionService {

  disponibiliteMission = new Subject<boolean>();

  constructor(private _http: HttpClient) { }

  
  verifierDisponibilite(debut: Date, fin: Date) {
    this._http.get(environment.baseUrl + "missions?start=" + debut + "&fin=" + fin).subscribe((data: boolean) => {
      this.disponibiliteMission.next(data);
    }, (error: any) => {
      console.log("erreur lors de la requete de recherche de disponibilite");
    });
  }

  abonnementDisponibiliteMission(): Observable<boolean> {
    return this.disponibiliteMission.asObservable();
  }
}
