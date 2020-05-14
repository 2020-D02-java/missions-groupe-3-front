import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { Observable } from 'rxjs/internal/Observable';
import { LigneDeFrais } from '../models/LigneDeFrais';
import { Prime } from '../models/Prime';

/**
 * Service donnant accès aux informations techniques
 */
@Injectable({
  providedIn: 'root'
})
export class GestionFraisService {

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

}
