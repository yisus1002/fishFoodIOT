import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record-reponse';
import { RecordService } from 'src/app/services/record.service';
import { ControllerService } from '../../../../../../services/controllers/controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  record:Record[]=[];
  constructor(
    private _Srecord: RecordService,
    private _Sctr: ControllerService
    ){
    this._Sctr.leerRole()
    this.getRecords()
  }
  ngOnInit(): void {

  }

  getRecords(){
    this._Srecord.getrecord()
    .pipe()
    .subscribe({
      next: (data) => {
        this.record=data
        if(this.record.length > 10){
          const recor = this.record.slice(this.record.length - 10);
          this.record=recor
        }else{
          this.record=data

        }
            },
      error: (err) => {
              console.log(err);
            }
    })
  }
}
