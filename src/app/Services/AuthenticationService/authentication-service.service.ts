import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../Login/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authDetail: any[] = []; // Use the appropriate type for authentication details

  constructor(
    private cookieService: CookieService,
    private storage: LoginService,
    private route: Router
  ) {
    this.loadAuthentication();
  }

  loadAuthentication() {
    let userData = this.cookieService.get('token');
    if (Object.keys(userData).length > 0) {
      
      this.authDetail = JSON.parse(userData); // Parse the string into an array of authentication details
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
      this.route.navigate(["/login"]);
    }
  }

  isAuthLogin() {
    return this.isAuthenticated.value;
  }
}
