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
  missions = new Subject<Mission[]>();
  missionModifiee = new Subject<string>();
  mission: Mission;
  delete = new Subject<string>();

  constructor(private _http: HttpClient) { }

  
  verifierDisponibilite(debut: Date, fin: Date, email: string, missionId: number) {
    this._http.get(environment.baseUrl + "missions/disponibilite?start=" + debut + "&end=" + fin + "&email=" + email + "&exception=" + missionId).subscribe((data: string) => {
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
      this.missionCree.next("cree")
    }, (error:any) => {
      console.log(error);
      this.missionCree.next(error)
    });
  }

  abonnementMissionCree(): Observable<string> {
    return this.missionCree.asObservable();
  }

  chargerMissions(email: string){
    this._http.get<Mission[]>(environment.baseUrl + "missions/collegue?email="+email ).subscribe((data:Mission[])=> {
      this.missions.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

  abonnementMissions(): Observable<Mission[]> {
    return this.missions.asObservable();
  }

  deleteMission(mission: Mission){
    this._http.request<string>('delete',environment.baseUrl + "missions/delete?id=" + mission.id).subscribe((data:string)=> {
      this.delete.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

  modifierMission(mission: Mission) {
    console.log("modification "+mission.id);
    this._http.patch<string>(environment.baseUrl + "missions", mission).subscribe((data:string)=> {
      console.log("requete modification : ok");
      this.missionModifiee.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

  chargerMissionsDateDebut(email: string, tri: boolean){
    this._http.get<Mission[]>(environment.baseUrl + "missions/triDateDebut?email=" + email + "&tri=" +tri).subscribe((data:Mission[])=> {
      this.missions.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

  chargerMissionsDateFin(email: string, tri: boolean){
    this._http.get<Mission[]>(environment.baseUrl + "missions/triDateFin?email=" + email + "&tri=" +tri).subscribe((data:Mission[])=> {
      this.missions.next(data);
    }, (error:any) => {
      console.log(error);
    });
  }

}
