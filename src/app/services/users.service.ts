import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Users } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:string="https://fishfoodiot-8cc15-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { }


  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`${this.api}/users.json`)
    .pipe(
      map((resp:any)=>{
        return this.createArray(resp);
      })
    );
  }

  getUserId(id:any):Observable<Users>{
    return this.http.get<any>(`${this.api}/users/${id}.json`);
  }

  putUsers(id:any,user:Users):Observable<Users>{

    const userTmp={
      ...user
    }
    delete userTmp?.id;
    console.log(user.id);

    return this.http.put<any>(`${this.api}/users/${id}.json`,userTmp)
  }

  postUser(user:Users):Observable<Users>{
    return this.http.post<Users>(`${this.api}/users.json`, user)
    .pipe(
      map((resp:any)=>{
        user.id = resp?.name;
        return user;
      }),
    );
  }
  deleteUserId(id:any):Observable<any>{
    return this.http.delete<any>(`${this.api}/users/${id}.json`);
  }

  private createArray(usersObj:any):Users[] {
    const users:Users[]=[];
    if(usersObj ===null){return [];};
    Object.keys(usersObj).forEach((key:any)=>{
      const user:Users = usersObj[key];
      user.id=key;

      users.push(user);
    })
    return users;
  }

}
