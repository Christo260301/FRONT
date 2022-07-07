import { Component, OnInit } from '@angular/core';
import {Usuario, UsuarioService} from '../../services/usuario.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;  

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  
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
              private activeRoute: ActivatedRoute) {
              } 
    
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

  consultar(){ 
    this.UsuarioService.consultUsuario(this.usuario).subscribe( 
      res => {
        console.log(res)
      },
      err => console.log(err)
    );
    this.router.navigate(['/inicio']);
  }

  openPdfTables() {
    const documentDefinition = {
      content: [
        'Ficha técnica:',
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],

            body: [
              ['', ''],
              ['Atributo', 'Datos'],
              ['', ''],
              ['ID Usuario',{ text: this.usuario.id}],
              ['Nombre',{ text: this.usuario.nombre}],
              ['Apellido Paterno',{ text: this.usuario.a_paterno}],
              ['Apellido Materno',{ text: this.usuario.a_materno}],
              ['Telefono',{ text: this.usuario.telefono}],
              ['RFC',{ text: this.usuario.rfc}]
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
