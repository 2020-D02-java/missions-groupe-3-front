import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NoteDeFrais } from '../models/NoteDeFrais';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Service donnant accès aux informations techniques
 */
@Injectable({
  providedIn: 'root'
})
export class GestionFraisService {

  notefrais: NoteDeFrais[];

  constructor(private http: HttpClient) { }

  /**
   * Récupération d'un flux de liens techniques vers le backend
   */

  requestGetFrais() : Observable<NoteDeFrais[]>{
     return this.http.get<NoteDeFrais[]>(`${environment.baseUrl}note`);
  }
}
