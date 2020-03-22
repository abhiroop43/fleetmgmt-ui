import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toggleSideNav$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService
  ) {
    this.toggleSideNav$ = authService.checkIfUserAuthenticated();
  }

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
    // .then(() => {
    //   window.location.reload();
    // })
  }
}
