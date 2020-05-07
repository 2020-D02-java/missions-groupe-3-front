import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Collegue } from './../auth/auth.domains';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-navbar',
  templateUrl: './collapse-navbar.component.html',
  styleUrls: ['./collapse-navbar.component.scss']
})
export class CollapseNavbarComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  public isMenuCollapsed = true;

  constructor(private authSrv: AuthService, private router: Router) { }
  /**
   * Gestion de l'affichage du menu suivant le rôle de l'utilisateur
   */
  admin = false
  manager = false
  role() {
    this.collegueConnecte.subscribe(
      col => {
        col.roles.forEach(element => {
          if (element === `ROLE_ADMINISTRATEUR`) {
            this.admin = true
          } else if (element === `ROLE_MANAGER`) {
            this.manager = true
          }
        });
      }
    )
  }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.role()
  }

}
