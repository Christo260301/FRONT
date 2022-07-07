import { Component, OnInit } from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  usuario: Usuario={
    id:'',
    nombre:'',
    a_paterno:'',
    a_materno:'',
    telefono:'',
    rfc:''
  }
  constructor(private UsuarioService: UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  agregar(){
    delete this.usuario.id;
    this.UsuarioService.addUsuario(this.usuario).subscribe();
    this.router.navigate(['/inicio'])
  }

}
