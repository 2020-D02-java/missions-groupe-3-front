import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrtmntNuitService {

  constructor(private _http: HttpClient) { }

  start (){
    this._http.get<string>(environment.baseUrl + "trtmnt_nuit" ).subscribe((data:string)=> {
      console.log(data);
    }, (error:any) => {
      console.log(error);
    });
  }

}
