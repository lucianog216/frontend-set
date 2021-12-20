import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ValidateRolSupervisorGuard implements CanActivate {
  constructor(
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let rol = localStorage.getItem('rol');
      if (rol== '60b7fbd0c86aab40dc8b5e9b'){
        
        return true;
        
      }else{
        this.router.navigate(['login']);
        
  
        return false;
  
      }
  }
  
}
