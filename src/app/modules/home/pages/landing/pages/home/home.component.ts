import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimbreService } from 'src/app/services/timbre.service';
import { Horario, Schedule } from '../../../../../../models/horario-response';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from '../../../../../../services/controllers/controller.service';
import { RecordService } from 'src/app/services/record.service';
import { Record } from 'src/app/models/record-reponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loading:boolean=false;
  public activar:boolean=true;
  public tocar:boolean=true;
  public editar:boolean=false;
  public formu!:    FormGroup;

  da:any[]=[];
  public horari!:Schedule[];
  public record!:Record;
  // public tipo:any[]=[
  //   {cod:"Cambio de clase"},
  //   {cod:"Entrada"},
  //   {cod:"Salida"},
  //   {cod:"Descanso"},
  // ];

  // public sonara:any[]=[
  //   {cod: 1},
  //   {cod: 2},
  //   {cod: 3},
  // ];

  constructor(private _sHorario:TimbreService,
    private form     : FormBuilder,
    private toastr: ToastrService,
    private _sCtr: ControllerService,
    private _srcor: RecordService
    ){
      this.getHorario()
  }

  ngOnInit(): void {
    this.createform();
  }

  tocarTimbre(){
    this.tocar=true;
    this.putHorario(1,{tocar: true});
    if(this.tocar){
Swal.fire({
  title: 'Suministrando alimentación!',
  icon: 'success',
   timer: 5000,
  heightAuto:true,
  timerProgressBar: true,
  showConfirmButton: false,
  showCancelButton: false,
  backdrop:true,
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,

})
    }

  }
  cambiarEstado(){
    this.activar=true;
    this.putHorario(1, {activo: this.activar})

  }
  enviar(){

    let sihayrepetidos:boolean=false;
    let verifica:any[]= this.formu.value?.horario?.map((ele:any)=>ele?.start_time);

    verifica.forEach( (ele)=>{
      const cont = verifica.filter((x)=> x === ele);
      if(cont.length > 1){
        sihayrepetidos=true;
        return ;
      }
    });
    if(sihayrepetidos){
      this.toastr.error('Hay horas repetidas');
      return;
    }
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        if(controls instanceof FormGroup){
          Object.values(controls.controls).forEach(controls=>controls.markAllAsTouched())
        }else{
          controls.markAllAsTouched();
        }
      });
    }else{
      this.editar=false;
      let hora:any[]=this.formu.value?.horario;
      hora.sort((a:any, b:any) => a.start_time.localeCompare(b.start_time));
      let horario ={
        schedules:hora
      }
      this.putHorario(1, horario);
      setTimeout(() => {
        this.postInforme(this.record)
      }, 3000);
      this.toastr.success('Horario actualizado')
    }

  }

  getHorario(){
    this._sHorario.getHorarioId(1)
    .pipe(finalize(()=>{
      this.loading=true
    }))
    .subscribe({
      next: (data)=>{
        this.actualizarEstado(data);
      },
      error: ()=>{

      }
    })
  }
  putHorario(id:any, horario:any){
    this._sHorario.putHorario(id, horario)
    .pipe(
      finalize(()=>{

      })
    )
    .subscribe({
      next:(data)=>{
        console.log(data);

        let fecha:Date = new Date();

        this.record={
          id:this._sCtr.user?.id,
          email:this._sCtr.user?.email,
          lastname:this._sCtr.user?.lastname,
          name:this._sCtr.user?.name,
          schedules:data?.schedules,
          update_date:fecha.toLocaleDateString(),
        }
        this.actualizarEstado(data);
      },
      error:()=>{

      }
    })
  }
  postInforme(recor:Record){
    this._srcor.postrecord(recor)
    .subscribe({
      next:(data)=>{
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  actualizarEstado(data:Horario){
    this.activar=data?.activo;
    this.horari=data?.schedules;
    this.loadForm(this.horari)

  }
  get horario(){   return this.formu.get('horario') as FormArray};
  addHora(){
    this.horario.push(
      this.form.group({
        start_time : ["", [Validators.required],[]],
        // tipo       : ["", [Validators.required],[]],
        // sonara     : ["", [Validators.required],[]],
      })
    )
  }
  cancel(){
    this.editar=false
    this.loadForm(this.horari)
  }
  delHora(id:any){
    this.horario.removeAt(id);
  }
  public getCtrl(key: string, form: FormGroup) {
    return  (<FormArray>form.get(key));
  }
  loadForm(schedule:any[]){
    this.horari= schedule;
    this.horario.clear();
    this.horari.forEach((hora: any) => {
      const horaForm = this.form.group({
        start_time: new FormControl(hora?.start_time),
        tipo: new FormControl(hora?.tipo),
        sonara: new FormControl(hora?.sonara),
      },{
      });
      this.horario.push(horaForm);
    });
  }
  createform(){
    this.formu= this.form.group({
      horario :this.form.array([],[Validators.required])
    })
  }
}
