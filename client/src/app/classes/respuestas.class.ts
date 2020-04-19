export class Respuestas{
    idrespuestas : number;
    dependencia : string;
    programa : string;
    usuario : string;
    estatus : string;
    respuestasp1 : [];
    respuestasp2 : [];
    validaciones : any = {
        id: 0,
        idrespuesta: 0,
        validacion1: false,
        validacion1a: false,
        validacion1justificacion: "",
        validacion2: false,
        validacion2a: false,
        validacion2justificacion: "",
        validacion3: false,
        validacion3a: false,
        validacion3justificacion: "",
        validacion4: false,
        validacion4a: false,
        validacion4justificacion: "",
        validacion5: false,
        validacion5a: false,
        validacion5justificacion: "",
        validacion6: false,
        validacion6a: false,
        validacion6justificacion: "",
        validacion6comentarios: "",
        validacion7: false,
        validacion7a: false,
        validacion7justificacion: "",
        validacion7comentarios: ""
    }
    respuestas : {
        pregunta1complemento : "",
        pregunta2: "no",
        pregunta3: "no",
        pregunta3complemento: "",
        pregunta4: "entregaayudas",
        pregunta4complemento: "",
        pregunta5: "no",
        pregunta5complemento: "",
        pregunta6: "directamente",
        pregunta7: "unico",
        pregunta8: "no",
        pregunta8complemento: "",
        pregunta9: "federal",
        pregunta10: "educacionobligatoria",
        pregunta10complemento: "",
        pregunta11: "no",
        pregunta11complemento: "",
        pregunta12: "no",
        pregunta12complemento: ""
    };

    constructor(){
        this.idrespuestas = 0;
        this.dependencia = "";
        this.programa = "";
        this.usuario = "";
        this.estatus = "";
        this.respuestasp1 = [];
        this.respuestasp2 = [];

        this.respuestas = {
            pregunta1complemento : "",
            pregunta2: "no",
            pregunta3: "no",
            pregunta3complemento: "",
            pregunta4: "entregaayudas",
            pregunta4complemento: "",
            pregunta5: "no",
            pregunta5complemento: "",
            pregunta6: "directamente",
            pregunta7: "unico",
            pregunta8: "no",
            pregunta8complemento: "",
            pregunta9: "federal",
            pregunta10: "educacionobligatoria",
            pregunta10complemento: "",
            pregunta11: "no",
            pregunta11complemento: "",
            pregunta12: "no",
            pregunta12complemento: ""
        }

        this.validaciones = {
            id: 0,
            idrespuesta: 0,
            validacion1: false,
            validacion1a: false,
            validacion1justificacion: "",
            validacion2: false,
            validacion2a: false,
            validacion2justificacion: "",
            validacion3: false,
            validacion3a: false,
            validacion3justificacion: "",
            validacion4: false,
            validacion4a: false,
            validacion4justificacion: "",
            validacion5: false,
            validacion5a: false,
            validacion5justificacion: "",
            validacion6: false,
            validacion6a: false,
            validacion6justificacion: "",
            validacion6comentarios: "",
            validacion7: false,
            validacion7a: false,
            validacion7justificacion: "",
            validacion7comentarios: ""
        }
    }
  }