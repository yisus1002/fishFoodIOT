import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hcsr } from '../models/hcsr';

@Injectable({
  providedIn: 'root'
})
export class HcsrService {

  api:string="https://649640e683d4c69925a2b39f.mockapi.io"
  constructor(
    private http: HttpClient,
  ) { }

  getHcsr():Observable<Hcsr[]>{
    return this.http.get<Hcsr[]>(`${this.api}/distance/`)
  }

  getHcsrId(id:any):Observable<Hcsr>{
    return this.http.get<Hcsr>(`${this.api}/distance/${id}`);
  }
  postHcsr(Hcsr:Hcsr):Observable<Hcsr>{
    return this.http.post<Hcsr>(`${this.api}/distance/`, Hcsr);
  }
  putHcsr(id:any, Hcsr:any):Observable<Hcsr>{
    return this.http.put<Hcsr>(`${this.api}/distance/${id}`, Hcsr);
  }
  deleteHcsr(id:any):Observable<any>{
    return this.http.delete<any>(`${this.api}/distance/${id}`);
  }
}
