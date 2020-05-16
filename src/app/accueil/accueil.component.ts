import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { Subject, Observable } from 'rxjs';
import { TrtmntNuitService } from '../services/trtmnt-nuit.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;
  admin: boolean;

  constructor(private authSrv: AuthService, private trtmntNuit: TrtmntNuitService) { 
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(data => {
      this.collegue = data;
      if (this.collegue.roles != undefined) {
        this.collegue.roles.forEach(value => {
          if (value == "ROLE_ADMINISTRATEUR") { this.admin = true; }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  traitementNuit(){
    this.trtmntNuit.start();
  }

}
