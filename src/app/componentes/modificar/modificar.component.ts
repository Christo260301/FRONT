import { Component, OnInit } from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  usuario: Usuario = {
    id:'',
    nombre:'',
    a_paterno:'',
    a_materno:'',
    telefono:'',
    rfc:''
  }
  id:any;

  constructor(private UsuarioService: UsuarioService, 
              private router:Router,
              private activeRoute: ActivatedRoute) { } 

  ngOnInit(): void {
    const id_entada = this.activeRoute.snapshot.params['id'];
    console.log('id de entrada: '+id_entada);

    if(id_entada){
      this.UsuarioService.getUnUsuario(id_entada).subscribe(
        res => {
          this.usuario = res[0];
          console.log(res[0] ); 
        },
        err => console.log(err)
      );
    }
  }

  modificar(){ 
    this.UsuarioService.editUsuario(this.usuario).subscribe( 
      res => {
        console.log(res)
      },
      err => console.log(err)
    );
    this.router.navigate(['/inicio']);
  }
}
