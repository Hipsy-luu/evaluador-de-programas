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
    this.respuestas = [];
    this.respuestaSeleccionada = new Respuestas();

    this.apiDataService.checkLogin(async (success)=>{
      console.log(success);
      switch(this.apiDataService.user.rolusuario){
        case 0:
          this.reloadData();
          break;
        case 1:
          this.reloadData();
          console.log("smn");
          console.log(this.apiDataService.user);
          
          
          break;
        case 2: //Usuario que registra los programas
            this.route.navigateByUrl('/register-program')
          break;
        case 3:
          this.reloadData();
          break;
      }
    },(error)=>{
      /* console.log(error); */
      
      this.route.navigateByUrl('/')
    })
  }

  reloadData(){
    this.respuestas = [];
    this.respuestaSeleccionada = new Respuestas();
    this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response : ServerMessage)=>{
      this.respuestas = response.data.respuestas;
    }).catch((error)=>{
      console.log("error");
      console.log(error);
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
