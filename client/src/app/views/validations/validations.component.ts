import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { ServerMessage } from '../../classes/serverMessages.dto';
import { Respuestas } from '../../classes/respuestas.class';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { email } from './emails/email';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import '../../../assets/js/smtp'; //file path may change → 
declare let Email: any;

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

  constructor(public apiDataService: ApiDataService, private route: Router) {
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
      const element = {
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
        aclaraciones: this.respuestas[index].respuestas.aclaraciones,
      }
      
      data.push(element);
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
    console.log("intentando")
    this.apiDataService.getRespuestas(this.apiDataService.user.entidad).then((response: ServerMessage) => {
      console.log(response);
      this.respuestas = response.data.respuestas;
      this.entities = response.data.entities;
      this.selectedEntitie = "Todas";
      this.respuestasFiltered = Array.from(this.respuestas);
      this.changeStateSelected(false);
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
        this.respuestaSeleccionada.validaciones = JSON.parse(JSON.stringify(this.respuestaSeleccionada.validacionesManuales));
      }
    }
    //console.log(this.respuestaSeleccionada);
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
          this.createPDF();
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

  createPDF() {
    //console.log(this.respuestaSeleccionada);
    //console.log(this.apiDataService.user);
    let fixMont = new Date().getUTCMonth().toString().length == 1 ? "0" + new Date().getUTCMonth() : new Date().getUTCMonth();
    let fixDay = new Date().getDate().toString().length == 1 ? "0" + new Date().getDate() : new Date().getDate();
    let fixDate = "" + new Date().getFullYear() + "-" + fixMont + "-" + fixDay;

    let data = {
      noRespuestas: this.respuestaSeleccionada.idrespuestas,
      nomReporte: 'Clasificador de Programas con Enfoque Social',//a
      claveDep: this.respuestaSeleccionada.program.entidad,//b
      nomEntidad: this.respuestaSeleccionada.program.departamento,//b
      clavePrograma: this.respuestaSeleccionada.program.clave_presupuestaria,//c
      ejePrograma: "predguntar",//c
      nombrePrograma: this.respuestaSeleccionada.program.nombre_programa,//c
      clasiPragmatica: this.respuestaSeleccionada.program.cla_programatica,//c
      defPrograma: this.respuestaSeleccionada.program.definicion_programa,//d
      numMujeres: this.respuestaSeleccionada.program.cantidad_mujeres,//f
      numHombres: this.respuestaSeleccionada.program.cantidad_hombres,//f
      total: this.respuestaSeleccionada.program.cantidad_mujeres + this.respuestaSeleccionada.program.cantidad_hombres,//f
      sujetoSocial: this.respuestaSeleccionada.program.sujeto_social,//g

      claveAlineacionPED: this.respuestaSeleccionada.program.alineacion_ped_2017_2021,//h
      descripcionAlineacionPED: this.respuestaSeleccionada.program.descripcion_alineacion_ped,//h

      claveAlineacionODS: this.respuestaSeleccionada.program.alineacion_ods_meta,//j
      descripcionAlineacionODS: this.respuestaSeleccionada.program.descripcion_alineacion_ods_meta,//j

      presupuestoAuth: new Intl.NumberFormat("es-MX").format(20545),//k
      finPrograma: this.respuestaSeleccionada.program.descipcion_fin,//m
      propPrograma:this.respuestaSeleccionada.program.descipcion_objetivo //n
    }

    let validacion1texto = "";
    let validacion2texto = "";
    let validacion6texto = "";
    let validacion7texto = "";

    if(this.respuestaSeleccionada.validaciones.validacion1a == true){
      validacion1texto = "Se a validado que el programa es de enfoque social";
    }else{
      validacion1texto = "El Programa Presupuestario no es de enfoque social";
    }

    if(this.respuestaSeleccionada.validaciones.validacion2a == true){
      validacion2texto = "Se valido que el programa coadyuva en el desarrollo social de las personas";
    }else{
      validacion2texto = "El Programa Presupuestario no coadyuva en el desarrollo social de las personas";
    }

    if(this.respuestaSeleccionada.validaciones.validacion6a == true){
      validacion6texto = "Se a validado que el programa esta sujeto a reglas de operación";
    }else{
      validacion6texto = "El Programa Presupuestario no esta sujeto a reglas de operación";
    }

    if(this.respuestaSeleccionada.validaciones.validacion7a == true){
      validacion7texto = "Se valido que el programa cuenta con padrón general de beneficiarios";
    }else{
      validacion7texto = "El Programa no cuenta con padrón general de beneficiarios";
    }

    //a)      Nombre del Reporte (Clasificador de Programas con Enfoque Social) - OK
    //b)      Clave y nombre de la dependencia o entidad. - OK
    //c)      Clave, eje, y nombre del programa. - OK
    //d)      Clasificación programática. - OK
    //e)      Definición del Programa. - OK
    //f)       Población Objetivo (total y desagregada en hombres y mujeres) - OK
    //g)      Sujetos sociales. - OK
    //h)      Alineación al PED  - OK
    //i)      Alineación al Programa Sectorial
    //j)      Alineación a los ODS. - OK
    //k)      Presupuesto Autorizado. - OK
    //l)      Fuentes de financiamiento.
    //m)      Fin del Programa  - OK
    //n)      Propósito del Programa. - OK
    const documentDefinition = {
      // a string or { width: number, height: number }
      pageSize: 'A5',

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [10, 10, 10, 10],
      content: [{
        style: 'tableExample',
        table: {
          widths: ['*', 'auto', '*'],
          body: [
            [{ text: '', rowSpan: 3, colSpan: 1, border: [false, false, false, false], }, { text: 'GOBIERNO DEL ESTADO DE CHIHUAHUA', border: [false, false, false, false] }, { text: 'Fecha Validacion ' + fixDate, alignment: 'right', fontSize: 7, border: [false, false, false, false] }],
            ['', { text: data.nomReporte, alignment: 'center', fontSize: 7, border: [false, false, false, false] }, { text: 'No :' + data.noRespuestas, rowSpan: 2, colSpan: 1, border: [false, false, false, false], alignment: 'right', fontSize: 7 }],
            ['', { text: 'AUTORIZADO ' + (new Date().getFullYear()), alignment: 'center', border: [false, false, false, false] }, ''],
          ]
        }
      }, {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
          body: [
            [{ text: '', alignment: 'center', rowSpan: 1, colSpan: 18, border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.claveDep + ' - ' + data.nomEntidad, alignment: 'center', fontSize: 7, rowSpan: 1, colSpan: 18, fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: '', alignment: 'center', rowSpan: 1, colSpan: 18, border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.clavePrograma + ' - ' + data.ejePrograma + ' - ' + data.nombrePrograma + ' / ' + data.clasiPragmatica, alignment: 'center', fontSize: 7, rowSpan: 1, colSpan: 18, fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Definición del Programa', margin: [0, 5, 0, 0], alignment: 'center', fontSize: 8, rowSpan: 2, colSpan: 12, fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', { text: 'Beneficiarios', alignment: 'center', fontSize: 7, rowSpan: 1, colSpan: 6, fillColor: '#e5e5e5' }, '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', { text: 'Mujeres', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, '', { text: 'Hombres', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, '', { text: 'Total', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, ''],
            [{ text: data.defPrograma, fontSize: 7, rowSpan: 10, colSpan: 12, }, '', '', '', '', '', '', '', '', '', '', '', { text: data.numMujeres, alignment: 'center', fontSize: 6, rowSpan: 9, colSpan: 2, }, '', { text: data.numHombres, alignment: 'center', fontSize: 6, rowSpan: 9, colSpan: 2, }, '', { text: data.total, alignment: 'center', fontSize: 6, rowSpan: 9, colSpan: 2 }, ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', { text: "Recursos del programa", alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 6, fillColor: '#e5e5e5' }, '', '', '', '', ''],
            [{ text: 'Sujeto Social', fontSize: 8, rowSpan: 2, colSpan: 12, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', { text: "Autorizado", alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 6, fillColor: '#e5e5e5' }, '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', { text: data.presupuestoAuth, alignment: 'center', fontSize: 7, rowSpan: 3, colSpan: 6, }, '', '', '', '', ''],
            [{ text: data.sujetoSocial, fontSize: 6, rowSpan: 2, colSpan: 12, alignment: 'center' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            
            [{ text: validacion1texto, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: validacion2texto, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: validacion6texto, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: validacion7texto, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Proposito del programa', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.propPrograma, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Fin del programa', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.finPrograma, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'ALINEACION', fontSize: 6, rowSpan: 2, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'PED', fontSize: 6, rowSpan: 1, colSpan: 3, alignment: 'center' }, '', '', { text: data.claveAlineacionPED, fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center' }, '', { text: data.descripcionAlineacionPED, fontSize: 6, rowSpan: 1, colSpan: 13 }, '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'ODS', fontSize: 6, rowSpan: 1, colSpan: 3, alignment: 'center' }, '', '', { text: data.claveAlineacionODS, fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center' }, '', { text: data.descripcionAlineacionODS, fontSize: 6, rowSpan: 1, colSpan: 13 }, '', '', '', '', '', '', '', '', '', '', '', ''],
            

            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: 'FIRMA DEL TITULAR DE LA DEPENDENCIA', fontSize: 5, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 5, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: 'FIRMA DE QUIEN RESPONDE EL CLASIFICADOR', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: this.respuestaSeleccionada.titular, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: this.respuestaSeleccionada.usuario, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            /*['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            ['', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],*/
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return .5;
          },
          vLineWidth: function (i, node) {
            return .5;
          },
        }
      }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 0, 0, 0],
          fontSize: 9,
          color: 'black'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        alignment: 'justify'
      }
    };
    //pdfMake.createPdf(documentDefinition).open(); 
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBase64((pdfBase64) => {
      //alert(data);
      Email.send({
        Host: 'smtp.elasticemail.com',
        Port: 2525,
        //Username: 'luismi.luu@gmail.com',
        //Password: 'CD71EF3F18D61EAC4DD8F549D65FF2E49ABE',
        Username: 'clasificador@chihuahua.gob.mx',
        Password: '8544CC6047C188E711D10459A5748FAB87E4',
        To: [this.apiDataService.user.email,this.respuestaSeleccionada.usuarioEmail],
        Cc : /* 'luismi.luu@gmail.com' */'alberto.cortes@chihuahua.gob.mx',
        From: 'clasificador@chihuahua.gob.mx',
        Subject: "Reporte de validacion del programa presupuestario : " + data.noRespuestas,
        Body: email,
        Attachments : [{
          name : 'acuse-'+this.respuestaSeleccionada.idrespuestas+'.pdf',
          data :  pdfBase64
        }],
      }).then(message => { 
        if (message == "OK") {
          //alert(message); 
          alert("Se a mandado un correo con el reporte a su email");
          //Abre el pdf en una ventana
          pdfMake.createPdf(documentDefinition).open(); 
          console.log("exito mandando correo");
        }else{
          console.log("error enviando correo");
          alert(message);
        }
         
        //console.log(message);
      },(error)=>{
        console.log("error enviando correo");
        console.log(error);
        
      });
    });
  }
}
