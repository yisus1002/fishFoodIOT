import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../../../services/controllers/controller.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _Scrt: ControllerService){

  }
  ngOnInit(): void {
    this._Scrt.getUserId()
    // throw new Error('Method not implemented.');
  }

}
