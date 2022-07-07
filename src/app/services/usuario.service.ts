import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 
  'application/vnd.openxmlformants-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT =   
  '.xlsx'; 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  url = 'https://backuser.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url);
  } 

  //get un Usuario (Para consultar)
  getUnUsuario(id:String){
    return this.http.get<Usuario[]>(this.url+'/'+id);
  }

  //Agregar Usuario a la BD
  addUsuario(usuario:Usuario){
    return this.http.post(this.url, usuario);
  }

  //Eliminar Usuario de la BD
  deleteUsuario(id:String){
    return this.http.delete(this.url+'/'+id);
  }

  //Modificar Usuario de la BD
  editUsuario(usuario:Usuario){
    return this.http.put(this.url+'/'+usuario.id, usuario);
  }

  //Modificar Usuario de la BD
  consultUsuario(usuario:Usuario){
    return this.http.get(this.url+'/'+usuario.id);
  }

}

export interface Usuario{
  id?:string;
  nombre?:string;
  a_paterno?:string;
  a_materno?:string;
  telefono?:string;
  rfc?:string;
}


