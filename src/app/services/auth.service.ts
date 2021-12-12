import { Injectable, NgZone } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, login } from '../interfaces/interfaces';
import {Router} from '@angular/router'
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { usuario } from '../models/Usuario';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: any = {};
  url3 = 'http://localhost:8080/api/auth/login/';
  url5 = 'http://localhost:8080/api/auth/google/'

  public auth2: any;
  
  constructor(
      private http: HttpClient,
      private router: Router, 
      private ngZone: NgZone
    ) { 

 /*    this.googleInit();
    

     this.auth.authState.subscribe( user =>{
        console.log('Estado del usuario:', user);
        
        this.router.navigate(['usuario'])
        if( !user ){
          return;
          
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.correo = user.email;
        this.usuario.img = user.photoURL;
       this.usuario.token = user.refreshToken;
        console.log(this.usuario.token)
        
          localStorage.setItem('correo', this.usuario.correo);
          localStorage.setItem('uid', this.usuario.uid);
          localStorage.setItem('nombre' , this.usuario.nombre);
          localStorage.setItem('token' , JSON.stringify(this.usuario.token));
         
        this.router.navigate(['usuario'])
    }); */

    
}

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: environment.GOOGLE_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
        });

        resolve('');
      });

    });
  }

  logOut(){
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }


/*   login() {
  
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   

  }
  logout() {
    this.auth.signOut();
  } */

  loginGoogle(id_token: usuario ) {
    
    return this.http.post<any>(this.url5, id_token)
    
      .pipe(
       tap(
         (resp=>resp.json()),
       data=> console.log('nuestro server', data),
        ),
       
        catchError(err => of(err.error.msg))
      );
  }

  signUp(usuario: login ){
    return this.http.post<any>(this.url3, usuario);
  }
  signIp(usuario: login ){
    return this.http.post<any>(this.url3, usuario);
  }
  
  loggedIn(){
    return !!localStorage.getItem('token');
    
  }
  
  getToken(){
    return localStorage.getItem('token');
    return localStorage.getItem('nombre')
  }
}
