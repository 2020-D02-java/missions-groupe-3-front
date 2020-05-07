import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Mission } from '../models/Mission';

@Injectable({
  providedIn: 'root'
})
export class DataMissionService {

  disponibiliteMission = new Subject<boolean>();

  constructor(private _http: HttpClient) { }

  
  verifierDisponibilite(debut: Date, fin: Date) {
    this._http.get(environment.baseUrl + "missions/disponibilite?start=" + debut + "&end=" + fin).subscribe((data: string) => {
      let chaine: string = data.valueOf().toString();
      if (chaine == "true"){
        this.disponibiliteMission.next(true);
      }else{
        console.log("false")
        this.disponibiliteMission.next(false);
      }
    }, (error: any) => {
      console.log("erreur lors de la requete de recherche de disponibilite");
    });
  }

  abonnementDisponibiliteMission(): Observable<boolean> {
    return this.disponibiliteMission.asObservable();
  }

  creerMission(mission: Mission){
    this._http.post<Mission>(environment.baseUrl + "missions" , mission).subscribe((data:Mission)=> {
      console.log("Mission créé");
    }, (error:any) => {
      console.log(error);
    });
  }
}
