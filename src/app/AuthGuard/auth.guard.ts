import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/Login/login.service';

//AuthGuards
export const authGuard:CanActivateFn =(route,state) => {
  const currentmenu = route.url[0].path;
const router = inject(Router);
const service = inject(LoginService);

if(service.isLoggedIn()) {
  return true;
}
else{
  router.navigate(['/login']);
    return false;
}

}
