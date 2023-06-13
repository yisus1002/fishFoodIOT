import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimbreService } from 'src/app/services/timbre.service';
import { Horario, Schedule } from '../../../../../../models/horario-response';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

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
  public tipo:any[]=[
    {cod:"Cambio de clase"},
    {cod:"Entrada"},
    {cod:"Salida"},
    {cod:"Descanso"},
  ];

  public sonara:any[]=[
    {cod: 1},
    {cod: 2},
    {cod: 3},
  ];

  constructor(private _sHorario:TimbreService,
    private form     : FormBuilder,
    private toastr: ToastrService
    ){
      this.getHorario()
  }

  ngOnInit(): void {
    this.createform();
  }
  showCustomNotification() {
    const customNotification = `
      <div class="custom-notification">
        <h3>Título de la notificación</h3>
        <p>Contenido HTML personalizado aquí</p>
      </div>
    `;
    this.toastr.info(customNotification, 'Notificación personalizada', {
      enableHtml: true,
      messageClass: 'toast-custom-class',
      positionClass: 'toast-center',
      timeOut: 5000,
    });
  }

  tocarTimbre(){
    this.tocar=true;
    this.putHorario(1,{tocar: true});
    // this.toastr.success("hola")
    // this.showCustomNotification()
  }
  cambiarEstado(){
    this.activar=!this.activar;
    this.putHorario(1, {activo: this.activar})

  }
  enviar(){
    console.log(this.formu.value);

    let sihayrepetidos:boolean=false;
    let verifica:any[]= this.formu.value?.horario?.map((ele:any)=>ele?.start_time);
    verifica.forEach( ele=>{
      const cont = verifica.filter((x)=> x === ele);
      return sihayrepetidos = (cont.length > 1);
    });
    if(sihayrepetidos){
      // this._sCtr.showToastr_error('Hay horas repetidas')
      console.log("{si hay}");

      return;
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
        if(this.tocar){
          console.log('Timbre tocado');
    Swal.fire({
      title: 'Tocando timbre!',
      icon: 'success',
      // html: '<ng-container style="margin:0;"><i class="fa-solid fa-stopwatch fa-shake" style="font-size: 50px; color: rgb(255, 0, 0);"></i></ng-container>',
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
    this.tocar=false;
        }
      })
    )
    .subscribe({
      next:(data)=>{
        this.actualizarEstado(data);
      },
      error:()=>{

      }
    })
  }
  actualizarEstado(data:Horario){
    this.activar=data?.activo;
    this.horari=data?.schedules;
    this.loadForm(this.horari)
    console.log(data);

  }
  get horario(){   return this.formu.get('horario') as FormArray};
  addHora(){
    this.horario.push(
      this.form.group({
        start_time : ["", [Validators.required],[]],
        tipo       : ["", [Validators.required],[]],
        sonara     : ["", [Validators.required],[]],
      })
    )
  }
  cancel(){
    this.editar=false
    this.loadForm(this.horari)
  }
  delHora(id:any){
    this.horario.removeAt(id);
    this.formu.value?.horario.removeAt(id);
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
