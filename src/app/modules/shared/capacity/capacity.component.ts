import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { HcsrService } from 'src/app/services/hcsr.service';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent {

  d:number=37;
  dist:number=0;
  por:number=0;
  x=100/this.d;

  constructor(
    private _Hcsr:HcsrService,
    private _snackBar: MatSnackBar
  ){
    this.getHcsr(1);
    setInterval(()=>{
      this.getHcsr(1);
    }, 5000);
  }

  getHcsr(id:number){
    this._Hcsr.getHcsrId(1)
    .pipe(finalize(()=>{
      let a:number = this.x * this.dist;

      this.por=Number((100- a).toFixed(2));
      console.log(this.por);
      if(this.por<0){
        this.por=0;
      }
      if(this.por===0){
        this.openSnackBar()
      }


    }))
    .subscribe({
      next: (data) => {
        this.dist=data?.distance;
        console.log(data)
      },
      error: (err) => {
              console.log(err)
      }
    })
  }
  openSnackBar() {
    let message:string= 'El contenedor esta vacio';
    let action:string= 'X';
  this._snackBar.open(message, action, {
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}

}
