import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service'
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ValidateRolAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let rol = localStorage.getItem('rol');
    if (rol== 'SUPERVISOR_ROLE'){
      
     
      

      return true;
      
    }else{
      
       this.router.navigate(['login']);
       

      return false;

    }

  }
  

}
