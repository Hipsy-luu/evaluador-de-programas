import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { ServerMessage } from '../../classes/serverMessages.dto';
import { Respuestas } from '../../classes/respuestas.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {

  respuestas : Respuestas[];
  respuestaSeleccionada : Respuestas;

  @ViewChild('btnClose') btnClose : ElementRef 

  constructor(public apiDataService : ApiDataService,private route: Router) { 
    this.respuestas = new Array<Respuestas>();
    this.respuestaSeleccionada = new Respuestas();
  }

  ngOnInit(): void {
    /* if(this.apiDataService.user.usuario == ""){
      this.route.navigateByUrl('/')
    } */
    this.respuestas = [];
    this.respuestaSeleccionada = new Respuestas();
    this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response : ServerMessage)=>{
      this.respuestas = response.data.respuestas;
    }).catch((error)=>{

    })
  }

  selectRespuesta(respuesta : Respuestas){
    this.respuestaSeleccionada = JSON.parse(JSON.stringify(respuesta));
    if(this.respuestaSeleccionada.validaciones == null){
      let dataFix = new Respuestas();
      this.respuestaSeleccionada.validaciones = JSON.parse(JSON.stringify(dataFix.validaciones));
      this.respuestaSeleccionada.validaciones.idrespuesta = respuesta.idrespuestas;
    }
    console.log(this.respuestaSeleccionada);
  }

  sendResponse(){
    /* console.log(this.respuestaSeleccionada.validaciones);
 */
    this.apiDataService.saveValidations(this.respuestaSeleccionada.validaciones,this.respuestaSeleccionada.idrespuestas)
      .then((response : ServerMessage)=>{
        this.btnClose.nativeElement.click();
        console.log("cerrando");
        console.log(response);

        this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response : ServerMessage)=>{
          this.respuestas = response.data.respuestas;
        }).catch((error)=>{
          console.log("error");
          console.log(error);
        })
      }).catch((error)=>{
        console.log("error");
        console.log(error);
      })
  }
}
