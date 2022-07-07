import { Component, OnInit } from '@angular/core';
import {UsuarioService, Usuario} from '../../services/usuario.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fileName = 'Información Usuario.xlsx';

  exportexcel(): void
  {
    //Pase aquí la identificación de la tabla 
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    //Generar libro de trabajo y agregar la hoja de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    //Guarda el archivo  
    XLSX.writeFile(wb, this.fileName);
  }

  //Variable
  ListarUsuario: Usuario[] = [];

  constructor(private UsuarioService: UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario(){
    this.UsuarioService.getUsuarios().subscribe(
      res => {
        console.log(res);
        this.ListarUsuario=<any>res;
      },
      err => console.log(err)
    )
  }

  eliminar(index:number){
    var id:string = this.ListarUsuario[index].id??'';
    this.UsuarioService.deleteUsuario(id).subscribe(
      res => {
        console.log('Usuario Eliminado');
        this.listarUsuario();
      }, 
      err => console.log(err)
    );
  }
  
  modificar(index:number){
    var id:string = this.ListarUsuario[index].id??'';
    this.router.navigate(['/edit/'+id]);
  }

  consultar(index:number){
    var id:string = this.ListarUsuario[index].id??'';
    this.router.navigate(['/query/'+id]);
  }

}
