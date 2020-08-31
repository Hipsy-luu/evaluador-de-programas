import { Injectable } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Respuestas } from '../../classes/respuestas.class';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { email } from './../../views/validations/emails/email';

import '../../../assets/js/smtp'; //file path may change → 

pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(public apiDataService: ApiDataService,) { }

  createPDF(respuestaSeleccionada: Respuestas,sendEmail : boolean) {
    //console.log(this.respuestaSeleccionada);
    //console.log(this.apiDataService.user);
    let fixMont = new Date().getUTCMonth().toString().length == 1 ? "0" + new Date().getUTCMonth() : new Date().getUTCMonth();
    let fixDay = new Date().getDate().toString().length == 1 ? "0" + new Date().getDate() : new Date().getDate();
    let fixDate = "" + new Date().getFullYear() + "-" + fixMont + "-" + fixDay;

    let data = {
      noRespuestas: respuestaSeleccionada.idrespuestas,
      nomReporte: 'CLASIFICADOR DE PROGRAMAS CON ENFOQUE SOCIAL',//a
      claveDep: respuestaSeleccionada.program.entidad,//b
      nomEntidad: respuestaSeleccionada.program.departamento,//b
      clavePrograma: respuestaSeleccionada.program.clave_presupuestaria,//c
      ejePrograma: "",//c
      nombrePrograma: respuestaSeleccionada.program.nombre_programa,//c
      clasiPragmatica: respuestaSeleccionada.program.cla_programatica,//c
      beneficiarios : "",
      defPrograma: respuestaSeleccionada.program.definicion_programa,//d
      numMujeres: respuestaSeleccionada.program.cantidad_mujeres,//f
      numHombres: respuestaSeleccionada.program.cantidad_hombres,//f
      
      total: Number.parseInt(respuestaSeleccionada.program.cantidad_mujeres) + Number.parseInt(respuestaSeleccionada.program.cantidad_hombres),//f
      sujetoSocial: respuestaSeleccionada.program.sujeto_social,//g

      claveAlineacionPED: respuestaSeleccionada.program.alineacion_ped_2017_2021,//h
      descripcionAlineacionPED: respuestaSeleccionada.program.descripcion_alineacion_ped,//h

      claveAlineacionODS: respuestaSeleccionada.program.alineacion_ods_meta,//j
      descripcionAlineacionODS: respuestaSeleccionada.program.descripcion_alineacion_ods_meta,//j

      presupuestoAuth: new Intl.NumberFormat("es-MX").format(20545),//k
      finPrograma: respuestaSeleccionada.program.descipcion_fin,//m
      propPrograma:respuestaSeleccionada.program.descipcion_objetivo //n
    }

    /* for (let index = 0; index < respuestaSeleccionada.respuestasp1.length; index++) {
      
      if(respuestaSeleccionada.respuestasp1[index] == "sujetoninasninos"){
        data.beneficiarios = data.beneficiarios + ",Niñas y niños de 0 a 11 años";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetoadolescentes"){
        data.beneficiarios = data.beneficiarios + ",Adolescentes de 12 a 17 años";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetojovenes"){
        data.beneficiarios = data.beneficiarios + ",Adolescentes de 18 a 29 años";
      }else if(respuestaSeleccionada.respuestasp1[index] == "mujeres"){
        data.beneficiarios = data.beneficiarios + ",Mujeres";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetomayores60"){
        data.beneficiarios = data.beneficiarios + ",Personas mayores de 60 a más";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetodiscapacidad"){
        data.beneficiarios = data.beneficiarios + ",Personas con discapacidad";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetoindigenas"){
        data.beneficiarios = data.beneficiarios + ",Personas indígenas";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetojornaleras"){
        data.beneficiarios = data.beneficiarios + ",Personas jornaleras";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetomigrantes"){
        data.beneficiarios = data.beneficiarios + ",Personas migrantes";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetoadultas30a59"){
        data.beneficiarios = data.beneficiarios + ",Personas adultas de 30 a 59";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetofamilias"){
        data.beneficiarios = data.beneficiarios + ",Familias o comunidades";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetosociedadcivil"){
        data.beneficiarios = data.beneficiarios + ",Organizaciones d ela sociedad civil";
      }else if(respuestaSeleccionada.respuestasp1[index] == "noaplica"){
        data.beneficiarios = data.beneficiarios + ",No aplica";
      }else if(respuestaSeleccionada.respuestasp1[index] == "sujetootro"){
        data.beneficiarios = data.beneficiarios + ",Otro ";
      }
    } */

    data.beneficiarios = respuestaSeleccionada.program.poblacion_objetivo;
/* 
    let validacion1texto = "";
    let validacion2texto = "";
    let validacion6texto = "";
    let validacion7texto = "";

    if(respuestaSeleccionada.validaciones.validacion1a == true){
      validacion1texto = "SI";
    }else{
      validacion1texto = "NO";
    }

    if(respuestaSeleccionada.validaciones.validacion2a == true){
      validacion2texto = "SI";
    }else{
      validacion2texto = "NO";
    }

    if(respuestaSeleccionada.validaciones.validacion6a == true){
      validacion6texto = "SI";
    }else{
      validacion6texto = "NO";
    }

    if(respuestaSeleccionada.validaciones.validacion7a == true){
      validacion7texto = "SI";
    }else{
      validacion7texto = "NO";
    } */

    let dataRespuestas = {
      pregunta1 : respuestaSeleccionada.program.clave_presupuestaria + " " +respuestaSeleccionada.programa,//ok
      pregunta2 : "",//ok
      pregunta3 : "",//ok
      pregunta4 : "",//ok
      pregunta5 : "",//ok
      pregunta6 : "",//ok
      pregunta7 : "",//ok
      pregunta8 : "",
      pregunta9 : "",
      pregunta10 : "",
      pregunta11 : "",
      pregunta12 : ""
    };

    dataRespuestas.pregunta2 = respuestaSeleccionada.respuestas.pregunta1complemento + " :";
    respuestaSeleccionada.respuestasp1.forEach(respuesta =>{
      if(respuesta == 'sujetoninasninos'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Niñas y niños de 0 a 11 años";
      }else if(respuesta == 'sujetoadolescentes'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Adolescentes de 12 a 17 años ";
      }else if(respuesta == 'sujetojovenes'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Adolescentes de 18 a 29 años";
      }else if(respuesta == 'mujeres'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Mujeres";
      }else if(respuesta == 'sujetomayores60'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas mayores de 60 a más";
      }else if(respuesta == 'sujetodiscapacidad'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas con discapacidad";
      }else if(respuesta == 'sujetoindigenas'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas indígenas";
      }else if(respuesta == 'sujetojornaleras'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas jornaleras";
      }else if(respuesta == 'sujetomigrantes'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas migrantes";
      }else if(respuesta == 'sujetoadultas30a59'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Personas adultas de 30 a 59";
      }else if(respuesta == 'sujetofamilias'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Familias o comunidades";
      }else if(respuesta == 'sujetosociedadcivil'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Organizaciones d ela sociedad civil";
      }else if(respuesta == 'noaplica'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- No aplica";
      }else if(respuesta == 'sujetootro'){
        dataRespuestas.pregunta2 =  dataRespuestas.pregunta2 + "- Otro";
      }
    });

    dataRespuestas.pregunta3  = respuestaSeleccionada.respuestas.pregunta2 ? respuestaSeleccionada.respuestas.pregunta2+" :" : "No ";
    respuestaSeleccionada.respuestasp2.forEach(element=>{
      dataRespuestas.pregunta3 = dataRespuestas.pregunta3 + ", " + element;
    });
    dataRespuestas.pregunta4 = respuestaSeleccionada.respuestas.pregunta3 ? respuestaSeleccionada.respuestas.pregunta3 : "No ";
    if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('pobreza') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "- Personas en condición de pobreza";
    } else if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('pobrezaextrema') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "- Personas en condición de pobreza extrema";
    }else if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('vulnerable') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "- Personas en condición vulnerable";
    }else if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('zonaprioritariaestatal') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "- Personas habitantes de zonas de atención prioritaria estatales";
    }else if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('zonaprioritariafederal') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "-  Personas habitantes de zonas de atención prioritaria federales";
    }else if (respuestaSeleccionada.respuestas.pregunta3complemento.includes('potroobreza') == true) {
      dataRespuestas.pregunta4 = dataRespuestas.pregunta4 + "- Otro : " + respuestaSeleccionada.respuestas.pregunta3complemento.slice( ( respuestaSeleccionada.respuestas.pregunta3complemento.indexOf("otro") ) + 5, respuestaSeleccionada.respuestas.pregunta3complemento.length);
    }

    dataRespuestas.pregunta5 = respuestaSeleccionada.respuestas.pregunta4complemento ? respuestaSeleccionada.respuestas.pregunta4complemento : " ";
    if (respuestaSeleccionada.respuestas.pregunta4.includes('entregaayudas') == true) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - El Programa entrega ayudas y subsidios directamente a la población";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('ninguno') == false) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - "+ respuestaSeleccionada.respuestas.pregunta5complemento ? respuestaSeleccionada.respuestas.pregunta5complemento : "";
    } 
    if (respuestaSeleccionada.respuestas.pregunta5complemento.toString() == "Otro") {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - "+ respuestaSeleccionada.respuestas.pregunta5otro ? respuestaSeleccionada.respuestas.pregunta5otro : "Sin Indicar";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('ninguno') == false) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - "+ respuestaSeleccionada.respuestas.pregunta5 ? respuestaSeleccionada.respuestas.pregunta5 : "No";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('ninguno') == true) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - "+ "No aplica";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('desarrollocapacidades') == true) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - El Programa se enfoca al desarrollo de capacidades";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('desarrolloservicios') == true) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - El Programa desarrolla infraestructura social";
    } 
    if (respuestaSeleccionada.respuestas.pregunta4.includes('ninguno') == true) {
      dataRespuestas.pregunta5 = dataRespuestas.pregunta5 + " - Ninguno";
    }

    if (respuestaSeleccionada.respuestas.pregunta4.includes('ninguno') == false) {
      dataRespuestas.pregunta6 = respuestaSeleccionada.respuestas.pregunta6 ? respuestaSeleccionada.respuestas.pregunta6 : "No"
    }else{
      dataRespuestas.pregunta6 = "No Aplica";
    }

    dataRespuestas.pregunta7 = respuestaSeleccionada.respuestas.pregunta7 ? respuestaSeleccionada.respuestas.pregunta7 : "No";

    dataRespuestas.pregunta8 = respuestaSeleccionada.respuestas.pregunta8 ? respuestaSeleccionada.respuestas.pregunta8 + " " : "No ";    
    if (respuestaSeleccionada.respuestas.pregunta8.toString()=='si') {
      dataRespuestas.pregunta8 = dataRespuestas.pregunta8 + respuestaSeleccionada.respuestas.pregunta8complemento ? respuestaSeleccionada.respuestas.pregunta8complemento : "";
    }

    if (respuestaSeleccionada.respuestas.pregunta9.includes('federal') == true) {
      dataRespuestas.pregunta9 = "Federal";
    }else if (respuestaSeleccionada.respuestas.pregunta9.includes('estatal') == true) {
      dataRespuestas.pregunta9 = "Estatal";
    }else if (respuestaSeleccionada.respuestas.pregunta9.includes('municipal') == true) {
      dataRespuestas.pregunta9 = "Municipal";
    }else if (respuestaSeleccionada.respuestas.pregunta9.includes('ingresospropios') == true) {
      dataRespuestas.pregunta9 = "Ingresos Propios";
    }else if (respuestaSeleccionada.respuestas.pregunta9.includes('otro') == true) {
      dataRespuestas.pregunta9 = "Otro : " + respuestaSeleccionada.respuestas.pregunta9.slice( ( respuestaSeleccionada.respuestas.pregunta9.indexOf("otro") ) + 5, respuestaSeleccionada.respuestas.pregunta9.length);;
    }

    if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'educacionobligatoria'){
      dataRespuestas.pregunta10 = "Educación obligatoria";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'promocionsalud'){
      dataRespuestas.pregunta10 = "Promoción de la salud, prevención y control de enfermedades transmisibles y atención médica";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'prevenirviolencia'){
      dataRespuestas.pregunta10 = "Prevenir, atender y erradicar la violencia de género";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'alimentacion'){
      dataRespuestas.pregunta10 = "Alimentación y nutrición";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'productosbasicos'){
      dataRespuestas.pregunta10 = "Abasto social de productos básicos";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'vivienda'){
      dataRespuestas.pregunta10 = "Vivienda";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'generacinoempleo'){
      dataRespuestas.pregunta10 = "Generación y conservación del empleo, actividades productivas y empresas del sector social de la economía";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'obrasinfraestructura'){
      dataRespuestas.pregunta10 = "Obras de infraestructura para agua potable, drenaje, electrificación, caminos y otras vías de comunicación, saneamiento ambiental y equipamiento urbano";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'desarrollopueblos'){
      dataRespuestas.pregunta10 = "Fomentar el desarrollo de los pueblos y las comunidades Indígenas en el estado";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'ninguno'){
      dataRespuestas.pregunta10 = "Ninguno";
    }else if(respuestaSeleccionada.respuestas.pregunta10.toString() == 'otro'){
      dataRespuestas.pregunta10 = "Educación obligatoria";
    }

    dataRespuestas.pregunta11 = respuestaSeleccionada.respuestas.pregunta11 ? respuestaSeleccionada.respuestas.pregunta11+ " " : "No ";
    if(respuestaSeleccionada.respuestas.pregunta11.toString()=='si'){
      dataRespuestas.pregunta11 = dataRespuestas.pregunta11 + respuestaSeleccionada.respuestas.pregunta11complemento ? respuestaSeleccionada.respuestas.pregunta11complemento : "";
    }

    dataRespuestas.pregunta12 = respuestaSeleccionada.respuestas.pregunta12 ? respuestaSeleccionada.respuestas.pregunta12 : "No"; 
    dataRespuestas.pregunta12 = dataRespuestas.pregunta12 + (respuestaSeleccionada.respuestas.pregunta12complemento ? " "+respuestaSeleccionada.respuestas.pregunta12complemento : "");

    let comentario6 = "";
    let comentario7 = "";
    if(respuestaSeleccionada.validaciones.validacion6a == false &&
      (respuestaSeleccionada.validaciones.validacion1a == true || respuestaSeleccionada.validaciones.validacion2a == true)){
        comentario6 = " (Nota: El Programa debe contar con Reglas de Operación)";
    }
    
    if(respuestaSeleccionada.validaciones.validacion5a && 
      (
          respuestaSeleccionada.respuestas.pregunta1complemento != 'funcionario' && 
          respuestaSeleccionada.respuestas.pregunta1complemento != 'noaplica'
      ) &&
      !respuestaSeleccionada.validaciones.validacion7a 
    ){
      comentario7 = " (Nota: El Programa debe contar con Padrón de Beneficiarios)"
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
            [{ text: '', rowSpan: 3, colSpan: 1, border: [false, false, false, false], }, { text: 'GOBIERNO DEL ESTADO DE CHIHUAHUA', alignment: 'center', border: [false, false, false, false] }, { text: 'Fecha Validacion ' + fixDate, alignment: 'right', fontSize: 7, border: [false, false, false, false] }],
            ['', { text: data.nomReporte, alignment: 'center', border: [false, false, false, false] }, { text: 'No :' + data.noRespuestas, rowSpan: 2, colSpan: 1, border: [false, false, false, false], alignment: 'right', fontSize: 7 }],
            ['', { text: 'EJERCICIO FISCAL 2021', alignment: 'center', border: [false, false, false, false] }, ''],
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
            ['', '', '', '', '', '', '', '', '', '', '', '', { text: data.beneficiarios, alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 6 }, '', '', '', '', ''],
            [{ text: data.defPrograma, fontSize: 7, rowSpan: 3, colSpan: 12, }, '', '', '', '', '', '', '', '', '', '', '', { text: 'Mujeres', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, '', { text: 'Hombres', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, '', { text: 'Total', alignment: 'center', fontSize: 6, rowSpan: 1, colSpan: 2, fillColor: '#e5e5e5' }, ''],
            [{ text: 'Sujeto Social', fontSize: 8, rowSpan: 1, colSpan: 12, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', { text: data.numMujeres, alignment: 'center', fontSize: 6, rowSpan: 2, colSpan: 2, }, '', { text: data.numHombres, alignment: 'center', fontSize: 6, rowSpan: 2, colSpan: 2, }, '', { text: respuestaSeleccionada.program.cantidad, alignment: 'center', fontSize: 6, rowSpan: 2, colSpan: 2 }, ''],
            [{ text: data.sujetoSocial, fontSize: 6, rowSpan: 2, colSpan: 12, alignment: 'center' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            /* ['', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', 'a', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], */
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'ALINEACION', fontSize: 6, rowSpan: 2, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'PED', fontSize: 6, rowSpan: 1, colSpan: 3, alignment: 'center' }, '', '', { text: data.claveAlineacionPED, fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center' }, '', { text: data.descripcionAlineacionPED, fontSize: 6, rowSpan: 1, colSpan: 13 }, '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'ODS', fontSize: 6, rowSpan: 1, colSpan: 3, alignment: 'center' }, '', '', { text: data.claveAlineacionODS, fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center' }, '', { text: data.descripcionAlineacionODS, fontSize: 6, rowSpan: 1, colSpan: 13 }, '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Fin del programa', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.finPrograma, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Proposito del programa', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: data.propPrograma, fontSize: 6, rowSpan: 1, colSpan: 18 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            [{ text: 'Resultados del Clasificador de Programas con Enfoque Social', fontSize: 8, rowSpan: 1, colSpan: 18,  fillColor: '#e5e5e5',alignment: 'center', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '1.- ¿El Programa presupuestario es de enfoque social?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '',  { text: respuestaSeleccionada.validaciones.validacion1a ? 'SI' : 'NO', fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '2.- ¿El Programa presupuestario coadyuva en el desarrollo social de las personas?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', { text: respuestaSeleccionada.validaciones.validacion2a ? 'SI' : 'NO', fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '3.- ¿El Programa presupuestario va dirigido a sujetos de derecho prioritarios?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', { text: respuestaSeleccionada.validaciones.validacion3a ? 'SI' : 'NO', fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '4.- ¿El Programa presupuestario se enfoca al desarrollo de capacidades en la población beneficiaria?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] },  '', '','', '', '','', '', '','', '', { text: respuestaSeleccionada.validaciones.validacion4a ? 'SI' : 'NO', fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '5.- ¿El Programa presupuestario otorga algún tipo de apoyo?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '',  { text: respuestaSeleccionada.validaciones.validacion5a ? 'SI' : 'NO', fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '6.- ¿El Programa presupuestario está sujeto a reglas de operación?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', { text: (respuestaSeleccionada.validaciones.validacion6a ? 'SI' : 'NO')+comentario6, fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            [{ text: '7.- ¿El Programa presupuestario cuenta con padrón general de beneficiarios?', fontSize: 6, rowSpan: 1, colSpan: 11, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', { text: (respuestaSeleccionada.validaciones.validacion7a ? 'SI' : 'NO')+comentario7, fontSize: 6, rowSpan: 1, colSpan: 7, alignment: 'center', border: [true, true, true, true] }, '', '', '', '','', ''],
            
            
            /* 
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''], */
            //FIRMAS
            
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: 'FIRMA DEL TITULAR DE LA DEPENDENCIA', fontSize: 5, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 5, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: 'FIRMA DEL RESPONSABLE DE DAR RESPUESTA AL CLASIFICADOR', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: respuestaSeleccionada.titular, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: respuestaSeleccionada.usuario, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
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
      },{
        style: 'tableExample',
        table: {
          widths: ['*', 'auto', '*'],
          body: [
            [{ text: '', rowSpan: 3, colSpan: 1, border: [false, false, false, false], }, { text: 'GOBIERNO DEL ESTADO DE CHIHUAHUA', alignment: 'center', border: [false, false, false, false] }, { text: 'Fecha Validacion ' + fixDate, alignment: 'right', fontSize: 7, border: [false, false, false, false] }],
            ['', { text: data.nomReporte, alignment: 'center', border: [false, false, false, false] }, { text: 'No :' + data.noRespuestas, rowSpan: 2, colSpan: 1, border: [false, false, false, false], alignment: 'right', fontSize: 7 }],
            ['', { text: 'EJERCICIO FISCAL 2021', alignment: 'center', border: [false, false, false, false] }, ''],
          ]
        }
      },{
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
          body: [
            [{ text: data.claveDep + ' - ' + data.nomEntidad, alignment: 'center', fontSize: 7, rowSpan: 1, colSpan: 18, fillColor: '#e5e5e5' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            /* 1 */[{ text: '1. CLAVE Y NOMBRE DEL PROGRAMA PRESUPUESTARIO',style: ['headerRespuestas'], fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta1, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 2 */[{ text: '2. ¿CUÁL ES EL O LOS SUJETOS DE DERECHO QUE ATIENDE EL PROGRAMA?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta2, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 3 */[{ text: '3. ¿EL PROGRAMA PRESUPUESTARIO ESTÁ ALINEADO A ALGÚN DERECHO HUMANO - SOCIAL?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta3, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 4 */[{ text: '4. ¿EL PROGRAMA ATIENDE POBLACIÓN EN ALGUNA CONDICIÓN DE VULNERABILIDAD?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta4, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 5 */[{ text: '5. ¿EN CUÁL O CUÁLES DE LAS SIGUIENTES CATEGORÍAS SE CLASIFICAN LOS BIENES Y/O SERVICIOS DEL PROGRAMA PRESUPUESTARIO?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta5, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 6 */[{ text: '6. ¿EL APOYO SOCIAL SE ENTREGA DIRECTAMENTE O INDIRECTAMENTE A LA POBLACIÓN?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta6, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 7 */[{ text: '7. ¿CON QUÉ FRECUENCIA EL PROGRAMA ENTREGA EL APOYO SOCIAL A LA MISMA PERSONA BENEFICIARIA?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta7, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 8 */[{ text: '8. ¿EL PROGRAMA PRESUPUESTARIO COADYUVA AL CUMPLIMIENTO DE ALGUNO DE LOS OBJETIVOS DE LA POLÍTICA DE DESARROLLO SOCIAL Y HUMANO ESTATAL?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta8, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 9 */[{ text: '9. ¿CUÁL ES LA PROCEDENCIA DE LOS RECURSOS DESTINADOS AL PROGRAMA PRESUPUESTARIO?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta9, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 10 */[{ text: '10. LOS RECURSOS DESTINADOS AL PROGRAMA PRESUPUESTARIO SON PRIORITARIOS Y DE INTERÉS PÚBLICO PORQUE ESTÁN DIRIGIDOS A:', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta10, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 11 */[{ text: '11. ¿EL PROGRAMA PRESUPUESTARIO CUENTA CON PADRÓN DE BENEFICIARIOS?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta11, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* 12 */[{ text: '12. ¿EL PROGRAMA PRESUPUESTARIO CUENTA CON REGLAS DE OPERACIÓN VIGENTES Y/O NORMATIVIDAD APLICABLE?', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: dataRespuestas.pregunta12, fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            /* Observaciones */[{ text: 'Observaciones o aclaraciones de la Dependencia o Entidad', fontSize: 6,style: ['headerRespuestas'], rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: respuestaSeleccionada.respuestas.aclaraciones.length > 0 ? respuestaSeleccionada.respuestas.aclaraciones : "Ninguna", fontSize: 5, rowSpan: 1, colSpan: 18, alignment: 'left', border: [true, true, true, true] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            
            //FIRMAS
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: '', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, true] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: 'FIRMA DEL TITULAR DE LA DEPENDENCIA', fontSize: 5, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 5, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: 'FIRMA DEL RESPONSABLE DE DAR RESPUESTA AL CLASIFICADOR', fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, '', { text: respuestaSeleccionada.titular, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] },'', '', '','', '', { text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] },'', { text: respuestaSeleccionada.usuario, fontSize: 6, rowSpan: 1, colSpan: 6, alignment: 'center', border: [false, false, false, false] }, '','', '', '','',{ text: '', fontSize: 6, rowSpan: 1, colSpan: 2, alignment: 'center', border: [false, false, false, false] }, ''],
            [{ text: ' ', fontSize: 6, rowSpan: 1, colSpan: 18, alignment: 'center', border: [false, false, false, false] }, '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
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
        headerRespuestas: {
          fontSize: 6,
          bold: true,
          margin: [0, 0, 0, 0]
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
    

    //Habilitar para enviar emails
    if(sendEmail == false){
      pdfMake.createPdf(documentDefinition).open(); 
    }else{
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.getBase64((pdfBase64) => {
        //alert(data);
        this.sendEmail([this.apiDataService.user.email,respuestaSeleccionada.usuarioEmail],data,documentDefinition,pdfBase64)
      });
    }
  }

  sendEmail(toUserEmail : string[], dataPdf , documentDefinition, pdfBase64){
    Email.send({
      Host: 'smtp.elasticemail.com',
      Port: 2525,
      //Username: 'luismi.luu@gmail.com',
      //Password: 'CD71EF3F18D61EAC4DD8F549D65FF2E49ABE',
      Username: 'clasificador@chihuahua.gob.mx',
      Password: '8544CC6047C188E711D10459A5748FAB87E4',
      To: toUserEmail,
      Cc : 'luismi.luu@gmail.com'/* 'alberto.cortes@chihuahua.gob.mx' */,
      From: 'clasificador@chihuahua.gob.mx',
      Subject: "Reporte de validacion del programa presupuestario : " + dataPdf.noRespuestas,
      Body: email,
      Attachments : [{
        name : 'acuse-'+dataPdf.idrespuestas+'.pdf',
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
  }
}
