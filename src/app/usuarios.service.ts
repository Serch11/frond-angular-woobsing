import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from './../app/usuarios/Usuarios'
import { Observable, pipe, of } from 'rxjs'
import { map, catchError, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = "http://localhost:8000/api/personas";
  httpOptions = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(
    private http: HttpClient
  ) { }


  getUser(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.url);
  }

  saveUsuarios(User: Usuarios[]): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(this.url, User, { headers: this.httpOptions });
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id)
  }

  updateUsuarios( id:number,User: Usuarios[]): Observable<Usuarios[]> {
    return this.http.put<Usuarios[]>(this.url + '/' + id, User);
  }

  getOneUsuario(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.url + '/' + id)
  }
}
