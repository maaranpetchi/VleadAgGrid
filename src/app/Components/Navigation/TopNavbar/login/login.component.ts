import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(-50%)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isSubmitted: boolean;
  user: any;
  showUsernameField: boolean;
  showPasswordField: boolean;
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private renderer: Renderer2
  ) { }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setBodyMinHeight();
  }
  setBodyMinHeight() {
    this.renderer.setStyle(document.body, 'min-height', '100vh');
  }



  labelState = 'default';

  ngOnInit() {
    this.renderer.setStyle(document.body, 'min-height', '100vh');

    this.showUsernameField = false;
    this.showPasswordField = false;
  }

  onSubmit() {
    this.spinnerService.requestStarted();
    this.isSubmitted = true;
    this.showUsernameField = false;
    this.showPasswordField = false;
    this.loginservice.login(this.username, this.password).subscribe({
      next: (result) => {
        this.spinnerService.requestEnded();
        if (result.success == true) {
          this.cookieService.set('token', result.user.employeeName);
          this.cookieService.set('username', result.user.employeeId);
          this.cookieService.set('UserId', result.user.id);
          localStorage.setItem('token', result.user.employeeName);
          localStorage.setItem('username', result.user.employeeId);
          localStorage.setItem('UserId', result.user.id);
          this.username = this.user;
          this.router.navigate(['/topnavbar/dashboard']);
        }
        else {
          Swal.fire(
            'Login failed!',
            'Invalid Username or password!',
            'error'
          )
        }
      }
    });
  }


}
