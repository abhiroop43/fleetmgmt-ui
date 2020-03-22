import { Component, OnInit } from '@angular/core';
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
  toggleSideNav$: Observable<
    boolean
  > = this.authService.checkIfUserAuthenticated();
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
  ) {}
  ngOnInit(): void {
    // this.toggleSideNav$ = this.authService.checkIfUserAuthenticated();
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
