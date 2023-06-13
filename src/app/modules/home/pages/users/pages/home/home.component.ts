import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private _sUsers:UsersService){
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._sUsers.getUsers().subscribe({
      next: (data)=>{
        console.log(data);

      },
      error: ()=>{

      },
      complete: ()=>{

      }
    })
  }

}
