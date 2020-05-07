import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Collegue } from './../auth/auth.domains';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService, private router: Router) { }

    /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/connexion'])
    );
  }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;

  }

}
