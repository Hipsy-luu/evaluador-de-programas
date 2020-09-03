import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../services/pdfService/pdf-service.service';
import { Respuestas } from '../../classes/respuestas.class';
import { ServerMessage } from '../../classes/serverMessages.dto';

@Component({
  selector: 'app-user-acuse',
  templateUrl: './user-acuse.component.html',
  styleUrls: ['./user-acuse.component.css']
})
export class UserAcuseComponent implements OnInit {
  respuestas: Respuestas[];

  constructor(public apiDataService: ApiDataService, private route: Router,public pdfServiceService : PdfServiceService) {
    this.respuestas = new Array<Respuestas>();
  }

  ngOnInit(): void {
    this.respuestas = [];

    this.apiDataService.checkLogin(async (success) => {
      //console.log(success);
      switch (this.apiDataService.user.rolusuario) {
        case 0:
          this.reloadData();
          break;
        case 1:
          this.reloadData();
          //console.log("smn");
          //console.log(this.apiDataService.user);


          break;
        case 2: //Usuario que registra los programas
          this.route.navigateByUrl('/register-program')
          break;
        case 3:
          this.reloadData();
          break;
      }
    }, (error) => {
      /* console.log(error); */

      this.route.navigateByUrl('/')
    })
  }

  reloadData() {
    this.respuestas = [];
    //console.log("intentando")
    this.apiDataService.getUserResponses(this.apiDataService.user.entidad).then(async (response: ServerMessage) => {
      //console.log(response);
      this.respuestas = response.data.respuestas;

      for (let index = 0; index < this.respuestas.length; index++) {
        let arrFix : {derecho : string}[]= Array.from(this.respuestas[index].respuestasp2);
        this.respuestas[index].respuestasp2 = [];

        arrFix.forEach(element => {
          if(element){
            this.respuestas[index].respuestasp2.push(element.derecho);
            //console.log(element.derecho)
          }else{
            //console.log("EEEEEEEEEE");
            //console.log(arrFix);
          }
        });
      }

      console.log(this.respuestas);
      
      //this.apiDataService.showNotification(0, "Respuestas Obtenidas con Exito!", 6000);
    }).catch((error) => {
      console.log("error");
      console.log(error);
      this.apiDataService.showNotification(1, "Error obteniendo respuestas!", 6000);
    })
  }

  createPDF(respuestaSeleccionada){
    this.pdfServiceService.createPDF(respuestaSeleccionada,false);
  }

}
