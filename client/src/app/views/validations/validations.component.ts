import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { ServerMessage } from '../../classes/serverMessages.dto';
import { Respuestas } from '../../classes/respuestas.class';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


import { PdfServiceService } from '../../services/pdfService/pdf-service.service';


@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {

  respuestas: Respuestas[];
  respuestasFiltered: Respuestas[];
  respuestaSeleccionada: Respuestas;
  statusSelected : boolean = false;

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  searchValue: String = "";
  page = 1;
  pageSize = 10;
  entities : [] = [];
  selectedEntitie = "Todas";

  @ViewChild('btnClose') btnClose: ElementRef

  constructor(public apiDataService: ApiDataService, private route: Router,public pdfServiceService : PdfServiceService) {
    this.respuestas = new Array<Respuestas>();
    this.respuestasFiltered = Array.from(this.respuestas);
    this.respuestaSeleccionada = new Respuestas();
  }

  ngOnInit(): void {
    this.respuestas = [];
    this.respuestasFiltered = Array.from(this.respuestas);
    this.respuestaSeleccionada = new Respuestas();

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

  subStrPregunta3(texto){
    return texto.slice( ( texto.indexOf("otro") ) + 5, texto.length);
  }

  filterByProgramName(event) {
    let searchValueTemp = event.charAt(0).toLowerCase() + event.slice(1);

    if (this.searchValue == "") {
      this.respuestasFiltered = Array.from(this.respuestas);
    } else {
      this.respuestasFiltered = this.respuestas.filter(function (respuesta) {
        let fixed = respuesta.programa.charAt(0).toUpperCase() + event.slice(1);
        return respuesta.programa.toLowerCase().includes(searchValueTemp);
      });
    }
  }
  //Funciones para exportar a exel
  exportAsXLSX(): void {

    let data = [];
    data = [{
      idrespuestas: this.respuestaSeleccionada.idrespuestas,
      dependencia: this.respuestaSeleccionada.dependencia,
      estatus: this.respuestaSeleccionada.estatus ? "Validado" : "Sin Validar",
      usuario: this.respuestaSeleccionada.usuario,
      pregunta1: " ",///////////////////////
      pregunta1complemento: this.respuestaSeleccionada.respuestas.pregunta1complemento,
      pregunta2: this.respuestaSeleccionada.respuestas.pregunta2,
      pregunta2complemento: " ",///////////////////
      pregunta3: this.respuestaSeleccionada.respuestas.pregunta3,
      pregunta3complemento: this.respuestaSeleccionada.respuestas.pregunta3complemento,
      pregunta4: this.respuestaSeleccionada.respuestas.pregunta4,
      pregunta4complemento: this.respuestaSeleccionada.respuestas.pregunta4complemento,
      pregunta5: this.respuestaSeleccionada.respuestas.pregunta5,
      pregunta5complemento: this.respuestaSeleccionada.respuestas.pregunta5complemento,
      pregunta6: this.respuestaSeleccionada.respuestas.pregunta6,
      pregunta7: this.respuestaSeleccionada.respuestas.pregunta7,
      pregunta8: this.respuestaSeleccionada.respuestas.pregunta8,
      pregunta8complemento: this.respuestaSeleccionada.respuestas.pregunta8complemento,
      pregunta9: this.respuestaSeleccionada.respuestas.pregunta9,
      pregunta10: this.respuestaSeleccionada.respuestas.pregunta10,
      pregunta10complemento: this.respuestaSeleccionada.respuestas.pregunta10complemento,
      pregunta11: this.respuestaSeleccionada.respuestas.pregunta11,
      pregunta11complemento: this.respuestaSeleccionada.respuestas.pregunta11complemento,
      pregunta12: this.respuestaSeleccionada.respuestas.pregunta12,

      validacion1: this.respuestaSeleccionada.validaciones.validacion1 ? "Validado" : "Sin Validar",
      validacion1a: this.respuestaSeleccionada.validaciones.validacion1a ? "Validado" : "Sin Validar",
      validacion1justificacion: this.respuestaSeleccionada.validaciones.validacion1justificacion,
      validacion2: this.respuestaSeleccionada.validaciones.validacion2 ? "Validado" : "Sin Validar",
      validacion2a: this.respuestaSeleccionada.validaciones.validacion2a ? "Validado" : "Sin Validar",
      validacion2justificacion: this.respuestaSeleccionada.validaciones.validacion2justificacion,
      validacion3: this.respuestaSeleccionada.validaciones.validacion3 ? "Validado" : "Sin Validar",
      validacion3a: this.respuestaSeleccionada.validaciones.validacion3a ? "Validado" : "Sin Validar",
      validacion3justificacion: this.respuestaSeleccionada.validaciones.validacion3justificacion,
      validacion4: this.respuestaSeleccionada.validaciones.validacion4 ? "Validado" : "Sin Validar",
      validacion4a: this.respuestaSeleccionada.validaciones.validacion4a ? "Validado" : "Sin Validar",
      validacion4justificacion: this.respuestaSeleccionada.validaciones.validacion4justificacion,
      validacion5: this.respuestaSeleccionada.validaciones.validacion5 ? "Validado" : "Sin Validar",
      validacion5a: this.respuestaSeleccionada.validaciones.validacion5a ? "Validado" : "Sin Validar",
      validacion5justificacion: this.respuestaSeleccionada.validaciones.validacion5justificacion,
      validacion6: this.respuestaSeleccionada.validaciones.validacion6 ? "Validado" : "Sin Validar",
      validacion6a: this.respuestaSeleccionada.validaciones.validacion6a ? "Validado" : "Sin Validar",
      validacion6comentarios: this.respuestaSeleccionada.validaciones.validacion6comentarios,
      validacion6justificacion: this.respuestaSeleccionada.validaciones.validacion6justificacion,
      validacion7: this.respuestaSeleccionada.validaciones.validacion7 ? "Validado" : "Sin Validar",
      validacion7a: this.respuestaSeleccionada.validaciones.validacion7a ? "Validado" : "Sin Validar",
      validacion7comentarios: this.respuestaSeleccionada.validaciones.validacion7comentarios,
      validacion7justificacion: this.respuestaSeleccionada.validaciones.validacion7justificacion,

      idprograma: this.respuestaSeleccionada.program.idprograma,
      nombre_programa: this.respuestaSeleccionada.programa,
      alineacion_ods_meta: this.respuestaSeleccionada.program.alineacion_ods_meta,
      alineacion_ped_2017_2021: this.respuestaSeleccionada.program.alineacion_ped_2017_2021,
      alineacion_pmp: this.respuestaSeleccionada.program.alineacion_pmp,
      alineacion_pnd_2013_2018: this.respuestaSeleccionada.program.alineacion_pnd_2013_2018,
      cantidad_hombres: this.respuestaSeleccionada.program.cantidad_hombres,
      cantidad_mujeres: this.respuestaSeleccionada.program.cantidad_mujeres,
      cla_programatica: this.respuestaSeleccionada.program.cla_programatica,
      clave_presupuestaria: this.respuestaSeleccionada.program.clave_presupuestaria,
      definicion_programa: this.respuestaSeleccionada.program.definicion_programa,
      departamento: this.respuestaSeleccionada.program.departamento,
      descipcion_fin: this.respuestaSeleccionada.program.descipcion_fin,
      descipcion_objetivo: this.respuestaSeleccionada.program.descipcion_objetivo,
      descripcion_alineacion_ods_meta: this.respuestaSeleccionada.program.descripcion_alineacion_ods_meta,
      descripcion_alineacion_ped: this.respuestaSeleccionada.program.descripcion_alineacion_ped,
      descripcion_alineacion_pmp: this.respuestaSeleccionada.program.descripcion_alineacion_pmp,
      descripcion_alineacion_pnd: this.respuestaSeleccionada.program.descripcion_alineacion_pnd,
      descripcion_pmp: this.respuestaSeleccionada.program.descripcion_pmp,
      entidad: this.respuestaSeleccionada.program.entidad,
      nivel_alineacion_ods_meta: this.respuestaSeleccionada.program.nivel_alineacion_ods_meta,
      nivel_alineacion_ped: this.respuestaSeleccionada.program.nivel_alineacion_ped,
      nivel_alineacion_pmp: this.respuestaSeleccionada.program.nivel_alineacion_pmp,
      nivel_alineacion_pnd: this.respuestaSeleccionada.program.nivel_alineacion_pnd,
      poblacion_objetivo: this.respuestaSeleccionada.program.poblacion_objetivo,
      sujeto_social: this.respuestaSeleccionada.program.sujeto_social,
    }];

    let cont = 0;
    this.respuestaSeleccionada.respuestasp1.forEach(element => {
      let newRows: any = { pregunta1: element };
      if (this.respuestaSeleccionada.respuestasp2.length > cont) {
        newRows = { pregunta1: element, pregunta2complemento: this.respuestaSeleccionada.respuestasp2[cont] }
      }
      data.push(newRows);
      cont++;
      if (this.respuestaSeleccionada.respuestasp1.length < (cont + 1)) {
        for (let index = cont + 1; index < this.respuestaSeleccionada.respuestasp2.length; index++) {
          let newRows: any = { pregunta2complemento: this.respuestaSeleccionada.respuestasp2[index] };
          data.push(newRows);
        }
      }

    });
    this.exportAsExcelFile(data, 'Respuestas_' + this.respuestaSeleccionada.idrespuestas);
  }

  exportAllAnswers(){
    //console.log(this.respuestas);
    let data = [];

    for (let index = 0; index < this.respuestas.length; index++) {
      let pregunta1Fix = "";
      this.respuestas[index].respuestasp1.forEach(element => {
        pregunta1Fix = pregunta1Fix + "," +element;
      });

      let pregunta2Fix = "";
      this.respuestas[index].respuestasp2.forEach(element => {
        pregunta2Fix = pregunta2Fix + "," +element;
      });

      if(this.respuestas[index].validaciones != null && this.respuestas[index].program != null){
        this.respuestas[index].respuestasp1.forEach(elem =>{
          if(elem == "sujetoninasninos"){
            this.respuestas[index].validaciones.validacion3a = true;
          }
        });

        let element = {
          IdRespuestas : this.respuestas[index].idrespuestas,
          Estatus : this.respuestas[index].estatus == true ? "Validado" : "No validado", 
          IdPrograma : this.respuestas[index].program.idprograma,
          NombrePrograma : this.respuestas[index].programa,
          ClavePresupuestaria : this.respuestas[index].program.clave_presupuestaria,
          Entidad : this.respuestas[index].dependencia,
          nombreUsuario: this.respuestas[index].usuario,
          pregunta1: pregunta1Fix,
          pregunta1complemento: this.respuestas[index].respuestas.pregunta1complemento,
          pregunta2: this.respuestas[index].respuestas.pregunta2,
          pregunta2complemento: pregunta2Fix,
          pregunta3: this.respuestas[index].respuestas.pregunta3,
          pregunta3complemento: this.respuestas[index].respuestas.pregunta3complemento,
          pregunta4: this.respuestas[index].respuestas.pregunta4,
          pregunta4complemento: this.respuestas[index].respuestas.pregunta4complemento,
          pregunta5: this.respuestas[index].respuestas.pregunta5,
          pregunta5complemento: this.respuestas[index].respuestas.pregunta5complemento,
          pregunta6: this.respuestas[index].respuestas.pregunta6,
          pregunta7: this.respuestas[index].respuestas.pregunta7,
          pregunta8: this.respuestas[index].respuestas.pregunta8,
          pregunta8complemento: this.respuestas[index].respuestas.pregunta8complemento,
          pregunta9: this.respuestas[index].respuestas.pregunta9,
          pregunta10: this.respuestas[index].respuestas.pregunta10,
          pregunta10complemento: this.respuestas[index].respuestas.pregunta10complemento,
          pregunta11: this.respuestas[index].respuestas.pregunta11,
          pregunta11complemento: this.respuestas[index].respuestas.pregunta11complemento,
          pregunta12: this.respuestas[index].respuestas.pregunta12,
          pregunta12complemento: this.respuestas[index].respuestas.pregunta12complemento,
          aclaraciones: this.respuestas[index].respuestas.aclaraciones,
          validacion1 : this.respuestas[index].validaciones.validacion1a ? 'SI' : 'NO',
          validacion2 : this.respuestas[index].validaciones.validacion2a ? 'SI' : 'NO',
          validacion3 : this.respuestas[index].validaciones.validacion3a ? 'SI' : 'NO',
          validacion4 : this.respuestas[index].validaciones.validacion4a ? 'SI' : 'NO',
          validacion5 : this.respuestas[index].validaciones.validacion5a ? 'SI' : 'NO',
          validacion6 : this.respuestas[index].validaciones.validacion6a ? 'SI' : 'NO',
          validacion6comentario : "",
          validacion7 : this.respuestas[index].validaciones.validacion7a ? 'SI' : 'NO',
          validacion7Comentario : "",
        }
        if(this.respuestas[index].validaciones.validacion6a == false &&
          (this.respuestas[index].validaciones.validacion1a == true || this.respuestas[index].validaciones.validacion2a == true)){
            element.validacion6comentario = " (Nota: El Programa debe contar con Reglas de Operación)";
        }
        
        if(this.respuestas[index].validaciones.validacion5a && 
          (
            this.respuestas[index].respuestas.pregunta1complemento != 'funcionario' && 
            this.respuestas[index].respuestas.pregunta1complemento != 'noaplica'
          ) &&
          !this.respuestas[index].validaciones.validacion7a 
        ){
          element.validacion7Comentario = " (Nota: El Programa debe contar con Padrón de Beneficiarios)"
        }
        
        data.push(element);
      }else{

        console.log(this.respuestas[index]);
      }
      
    }
    this.exportAsExcelFile(data, 'Reporte Programas Presupuestarios ' + new Date().toUTCString());
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    let dateFix = "" + new Date().getDate() + "_" + new Date().getMonth() + "_" + new Date().getFullYear() + "_"
    FileSaver.saveAs(data, fileName + '_fecha_' + dateFix + EXCEL_EXTENSION);
  }

  //Fin de las funciones para exportar a exel
  reloadData() {
    this.respuestas = [];
    this.respuestaSeleccionada = new Respuestas();
    //console.log("intentando")
    this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then(async (response: ServerMessage) => {
      //console.log(response);
      this.respuestas = response.data.respuestas;

      for (let index = 0; index < this.respuestas.length; index++) {
        const element = this.respuestas[index];
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
      //console.log(this.respuestas);
      this.entities = response.data.entities;
      this.selectedEntitie = "Todas";
      this.respuestasFiltered = Array.from(this.respuestas);
      this.changeStateSelected(true);//////////////////////////////////////////////////////////////////////
      //this.apiDataService.showNotification(0, "Respuestas Obtenidas con Exito!", 6000);
    }).catch((error) => {
      console.log("error");
      console.log(error);
      this.apiDataService.showNotification(1, "Error obteniendo respuestas!", 6000);
    })
  }

  changeEntitieSelected(opc : number){
    let searchValueTemp = opc.toString().charAt(0).toLowerCase() + opc.toString().slice(1);


    switch (opc) {
      case -1:
        this.selectedEntitie = "Todas";
        this.respuestasFiltered = Array.from(this.respuestas);
        break;
    
      default:
        this.selectedEntitie = opc.toString();

        this.respuestasFiltered = this.respuestas.filter(function (respuesta) {
          let fixed = respuesta.dependencia.charAt(0).toUpperCase() + opc.toString().slice(1);
          return respuesta.dependencia.toLowerCase().includes(searchValueTemp);
        });
        break;
    }
  }

  changeStateSelected(opc : boolean){
    this.statusSelected = opc;
      this.respuestasFiltered = this.respuestas.filter((respuesta) => {
        return respuesta.estatus == this.statusSelected ;
      });
  }

  selectRespuesta(respuesta: Respuestas) {
    this.respuestaSeleccionada = JSON.parse(JSON.stringify(respuesta));
    if (this.respuestaSeleccionada.validaciones == null) {
      let dataFix = new Respuestas();
      this.respuestaSeleccionada.validaciones = JSON.parse(JSON.stringify(dataFix.validaciones));
      this.respuestaSeleccionada.validaciones.idrespuesta = respuesta.idrespuestas;
    }else{
      if( this.respuestaSeleccionada.estatus == true){
        console.log(this.respuestaSeleccionada.respuestasp1);
        this.respuestaSeleccionada.validaciones = JSON.parse(JSON.stringify(this.respuestaSeleccionada.validacionesManuales));
        this.respuestaSeleccionada.respuestasp1.forEach(elem =>{
          if(elem == "sujetoninasninos"){
            this.respuestaSeleccionada.validaciones.validacion3a = true;
          }
        });
      }
    }
    console.log(this.respuestaSeleccionada);
  }

  sendResponse() {
    //console.log(this.apiDataService.user);}
    //this.createPDF();
    //console.log(this.respuestaSeleccionada.validaciones);
    
    this.apiDataService.saveValidations(this.respuestaSeleccionada.validaciones, this.respuestaSeleccionada.idrespuestas)
      .then((response: ServerMessage) => {   
        //console.log("cerrando");
        //console.log(response);
        this.apiDataService.showNotification(0, "Validaciones guardadas con Exito!", 6000);
        this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response: ServerMessage) => {
          this.respuestas = response.data.respuestas;
          this.btnClose.nativeElement.click();
          //this.pdfServiceService.createPDF(this.respuestaSeleccionada);
        }).catch((error) => {
          console.log("error");
          console.log(error);
        })
      }).catch((error) => {
        console.log("error");
        console.log(error);
        this.apiDataService.showNotification(1, "Error guardando validaciones!", 6000);
      })
  }

  createPDF(){
    this.pdfServiceService.createPDF(this.respuestaSeleccionada,false);
  }

  sendPDFByEmail(){
    this.pdfServiceService.createPDF(this.respuestaSeleccionada,true);
  }

  sendEmail(){
    this.apiDataService.sendEmail({})
      .then((response: ServerMessage) => {   
        console.log("exito");
        console.log(response);
        //this.apiDataService.showNotification(0, "Validaciones guardadas con Exito!", 6000);
        
      }).catch((error) => {
        console.log("error");
        console.log(error);
        //this.apiDataService.showNotification(1, "Error guardando validaciones!", 6000);
      });
  }
}
