import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userName:string='';
  email:string='';
  firstName:string='';
  lastName:string='';
  password:string='';

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  onRegister():void {
    const usuairo = new Usuario(this.userName,this.email,this.firstName,this.lastName,this.password);
    this.usuarioService.create(usuairo).subscribe(
      data => {
        console.log(data);
        this.volver();
      },
      err => console.log(err)
    );
  }

  volver():void {
    this.router.navigate(['/']);   
  }
}
