import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { Observable } from 'rxjs/internal/Observable';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { Prime } from '../models/Prime';
import { Subject } from 'rxjs';

/**
 * Service donnant accès aux informations techniques
 */
@Injectable({
  providedIn: 'root'
})
export class GestionFraisService {

  disponibiliteLigneFrais = new Subject<string>();

  constructor(private http: HttpClient) { }

  /**
   * Récupération d'un flux de lien vers le backend
   */

  requestGetNoteFrais(): Observable<NoteDeFrais[]> {
     return this.http.get<NoteDeFrais[]>(`${environment.baseUrl}note`);
  }


  /**
   * Récupération d'un flux de lien des lignes de frais d'une note de frais donnée
   */

  requestGetLigneFrais(idNote: string): Observable<LigneDeFrais[]> {
    return this.http.get<LigneDeFrais[]>(`${environment.baseUrl}ligne/UUID=${idNote}`);

 }

  /**
   * Récupération d'un flux de lien d'une seul note de frais
   */
 requestGetNoteFraisById(idNote: string): Observable<NoteDeFrais[]> {
  return this.http.get<NoteDeFrais[]>(`${environment.baseUrl}note/UUID=${idNote}`);
}

  /**
   * Récupération d'un flux de lien de prime d'une note de frais donnée
   */
requestGetPrime(idNote: string): Observable<Prime[]> {
  return this.http.get<Prime[]>(`${environment.baseUrl}prime/UUID=${idNote}`);
}

enregistrerLigneFrais(ligneDeFrais: LigneDeFrais): Observable<LigneDeFrais> {
  return this.http.post<LigneDeFrais>(`${environment.baseUrl}ligne`, ligneDeFrais);
}


verifierDisponibilite(date: Date, nature: string) {
  this.http.get(`${environment.baseUrl}ligne` + '/disponibilite?date=' + date + '&nature=' + nature).subscribe((data: string) => {
    let chaine: string = data.valueOf().toString();
    if (chaine == 'true'){
      this.disponibiliteLigneFrais.next('true');
    }else if (chaine == 'false'){
      console.log('false')
      this.disponibiliteLigneFrais.next('false');
    }else if (chaine == 'erreur:404'){
      console.log('erreur: resultat non trouvé');
      this.disponibiliteLigneFrais.next('erreur:404');
    }
  }, (error: any) => {
    console.log('erreur lors de la requete de recherche de disponibilite');
  });
}
}

