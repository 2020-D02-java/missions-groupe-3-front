import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Mission } from '../models/Mission';
import { Collegue } from '../auth/auth.domains';

@Injectable({
  providedIn: 'root'
})
export class DataMissionService {

  disponibiliteMission = new Subject<string>();
  missionCree = new Subject<string>();

  constructor(private _http: HttpClient) { }

  
  verifierDisponibilite(debut: Date, fin: Date, email: string) {
    this._http.get(environment.baseUrl + "missions/disponibilite?start=" + debut + "&end=" + fin + "&email=" + email).subscribe((data: string) => {
      let chaine: string = data.valueOf().toString();
      if (chaine == "true"){
        this.disponibiliteMission.next("true");
      }else if (chaine == "false"){
        console.log("false")
        this.disponibiliteMission.next("false");
      }else if (chaine == "erreur:404"){
        console.log("erreur: collegue non trouvé");
        this.disponibiliteMission.next("erreur:404");
      }
    }, (error: any) => {
      console.log("erreur lors de la requete de recherche de disponibilite");
    });
  }

  abonnementDisponibiliteMission(): Observable<string> {
    return this.disponibiliteMission.asObservable();
  }

  creerMission(mission: Mission){
    this._http.post<Mission>(environment.baseUrl + "missions" , mission).subscribe((data:Mission)=> {
      console.log("Mission créé");
      this.missionCree.next("cree")
    }, (error:any) => {
      console.log(error);
      this.missionCree.next(error)
    });
  }

  abonnementMissionCree(): Observable<string> {
    return this.missionCree.asObservable();
  }
}
