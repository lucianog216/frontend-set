import { Component, OnInit, NgZone } from '@angular/core';
import{FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

declare const gapi: any;

import {AuthService} from '../../services/auth.service'
import { UsuarioService } from '../../services/usuario.service';
import { data } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public auth2: any;
  uid: string | null;
  user = {
    correo: '',
    password:'',
    nombre:'',
    apellido:'',
    rol:'',
    celular:'',
    ciudad:'',
    uid:''
  }
  public usuario: any = {};


  constructor(
    private usuarioService: UsuarioService,   
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    //public auth: AngularFireAuth,
    private ngZone: NgZone
  ) {
    this.uid = localStorage.getItem('uid')
   }



  ngOnInit(): void {
    this.renderButton();
  
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
  
  async startApp() {

    await this.authService.googleInit();
    this.auth2 = this.authService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler( element, {},
        (googleUser: any) => {
          var id_token = googleUser.getAuthResponse().id_token;
          this.authService.loginGoogle(id_token).subscribe( res => {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); 
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail())
            var data = { id_token };
            localStorage.setItem('id_token', id_token);
            
            console.log(data);
            

            this.ngZone.run(() => {
            
               this.router.navigateByUrl('/usuario');
            });
          });
        }, (error: any) => {
          console.warn(JSON.stringify(error, undefined, 2));
        });
  }

  signIp(){
    this.authService.signIp(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.usuario.rol);
        localStorage.setItem('uid', res.usuario.uid);
        localStorage.setItem('img', res.usuario.img);
        localStorage.setItem('ciudad', JSON.stringify(res.usuario.ciudad));
        localStorage.setItem('region', JSON.stringify(res.usuario.region));
        localStorage.setItem('direccion', JSON.stringify(res.usuario.direccion));
        localStorage.setItem('nombre', JSON.stringify(res.usuario.nombre));
        localStorage.setItem('apellido', JSON.stringify(res.usuario.apellido));
        localStorage.setItem('correo', JSON.stringify(res.usuario.correo));
        localStorage.setItem('celular', JSON.stringify(res.usuario.celular));
        localStorage.setItem('team', res.usuario.team);
        localStorage.getItem('rol')
        console.log(this.user);

        const rol = localStorage.getItem('rol');
        if (rol== '60b7fbeec86aab40dc8b5e9c'){
          this.router.navigate(['supervisor/lista_guardia']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.usuario.nombre ,
            text: 'Bienvenido Supervisor',
            showConfirmButton: false,
            timer: 3000
          })
        }if(rol== '60b7fb45c86aab40dc8b5e99'){
          this.router.navigate(['usuario']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:  res.usuario.nombre,
            text: 'Bienvenido Administrador',
            showConfirmButton: false,
            timer: 1500
          })
        }if(rol== '60b7fbd0c86aab40dc8b5e9b'){
          this.router.navigate(['guardia/calendario']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.usuario.nombre ,
            text: 'Bienvenido Guardia',
            showConfirmButton: false,
            timer: 3000
          })
        }
        },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'El Correo Electronico del Usuario o Contraseña son Incorrectos',
          
        })
      }
      
    )

  }
/*   login(){
    
    try{
      
      this.authService.login( );
      
    }catch (error){
      console.log(error)


    }
  } */

}
