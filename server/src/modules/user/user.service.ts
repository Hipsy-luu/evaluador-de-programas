import { ValidacionesManuales } from './../../models/validacionesManuales.entity';
import { Injectable, Inject } from '@nestjs/common';
// import { USER_REPOSITORY } from '../utils/constants';
import { User } from '../../models/user.entity';
//Normalmente se usa para formatear el objeto que recibimos en el request
import { CreateEditUserDto } from './dto/createUser.dto';
import { ServerMessage } from '../../utils/dtos/serverMessages.dto';
import { Respuestas } from '../../models/respuestas.entity';
import { Respuestasp1 } from '../../models/respuestasp1.entity';
import { Respuestasp2complemento } from '../../models/respuestasp2complemento.entity';
import { Catprogramas } from '../../models/catprogramas.entity';
import { Catderechos } from '../../models/catderechos.entity';
import { CatapoyosSociales } from '../../models/catapoyos_sociales.entity';
import { CatobjetivosPolitica } from '../../models/catobjetivos_politica.entity';
import { Validaciones } from '../../models/validaciones.entity';
import { Sequelize } from 'sequelize-typescript';
import { CatDependencias } from '../../models/catdependencias.entity';

@Injectable()
export class UserService {
  constructor(
    //Es una manera de dar de alta el repositorio de la tabla de usuarios
    @Inject('UserRepository') private readonly userRepository: typeof User,
    @Inject('RespuestasRepository') private readonly respuestasRepository: typeof Respuestas,
    @Inject('ValidacionesRepository') private readonly validacionesRepository: typeof Validaciones,
    @Inject('ValidacionesManualesRepository') private readonly validacionesManualesRepository: typeof ValidacionesManuales,
    @Inject('Respuestasp1Repository') private readonly respuestasp1Repository: typeof Respuestasp1,
    @Inject('Respuestasp2complementoRepository') private readonly respuestasp2complementoRepository: typeof Respuestasp2complemento,
    @Inject('CatprogramasRepository') private readonly catprogramasRepository: typeof Catprogramas,
    @Inject('CatDependenciasRepository') private readonly catDependenciasRepository: typeof CatDependencias,
    /* @Inject('BandRepository') private readonly bandRepository: typeof Band, */
  ) { }

  /* async consultaEjemplo() {
    let response: any = {};

    try {
      response.newband = await this.bandRepository.findAll<Band>({
        attributes: ['band_id', 'name', 'photo', 'base_price', 'reviews', 'score'],
        where: { active: 1 },
        order: [
          ['created_at', 'DESC'],
        ],
        limit: 10,
        include: [{
          model: State,
          attributes: [['name', 'name']],
        }, {
          model: Town,
          attributes: [['name', 'name']],
        }, {
          model: BandSlider,
          attributes: [['url', 'url']],
          limit: 1
        }],
      }).map((band: any) => {
        return Object.assign(
          {
            band_id: band.band_id,
            name: band.name,
            photo: (new String(JSON.stringify(band.sliders[0])))
              .substring(8, new String(
                JSON.stringify(band.sliders[0])).length - 2),
            base_price: band.base_price,
            reviews: band.reviews,
            score: band.score,
            town_name: band.town.name,
            state_name: band.state.name
          })
      });

      return response;
    } catch (error) {
      return error;
    }
  } */

  /* async testUserWithBand(bandId : string) {
    return await this.userRepository.findOne<User>({include: [Band] ,where: {username: bandId}});
    //return await this.bandRepository.findOne<Band>({include: [User] ,where: {band_id: bandId}});
  }

  

  async findOneByEmail(useremail : string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email: useremail}});
  } */

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      /* attributes: ['idusuarios', 'usuario', 'nombre', 'apellidos', 'password', 'entidad', 'extension', 'rolusuario'], */
      where: { usuario: username }
    });
  }

  async getAllUsers(): Promise<ServerMessage> {
    try {
      var userList = await this.userRepository.findAll<User>();
      return new ServerMessage(false, "Lista de usuarios obtenida", userList);
    } catch (error) {
      return new ServerMessage(true, "Error obteniendo lista de usuarios", {});
    }
  }

  async createEditUser(userData: CreateEditUserDto): Promise<ServerMessage> {
    if (
      userData.nombre == undefined ||
      userData.nombre == null ||
      userData.apellidos == undefined ||
      userData.apellidos == null ||
      userData.email == undefined ||
      userData.email == null ||
      userData.entidad == undefined ||
      userData.entidad == null ||
      userData.extension == undefined ||
      userData.extension == null ||
      userData.rolusuario == undefined ||
      userData.rolusuario == null ||
      userData.usuario == undefined ||
      userData.usuario == null ||
      userData.password == undefined ||
      userData.password == null 
    ) {
      return new ServerMessage(true, 'Petición incompleta', {});
    }
    var user = await this.findOneByUsername(userData.usuario);

    if (!user) {
      try {
        var newUser: User = await this.userRepository.create<User>(userData, {});
        return new ServerMessage(false, "Usuario creado con éxito", newUser);
      } catch (error) {
        return new ServerMessage(true, "A ocurrido un error", error);
      }
    } else {
      try {
        user.apellidos = userData.apellidos;
        user.email = userData.email;
        user.entidad = userData.entidad;
        user.extension = userData.extension;
        user.nombre = userData.nombre;
        user.rolusuario = userData.rolusuario;

        var message = "Usuario actualizado con éxito";
        if(userData.password.length > 0 ){
          if (userData.password.length < 8) {
            return new ServerMessage(true,'La contraseña debe contener al menos 8 caracteres.',{});
          } 
          user.password = await user.protectPassword(userData.password);
          message = "Usuario y contraseña actualizada con éxito"
        }

        var newUserData = await user.save();
        return new ServerMessage(false, message, newUserData);
      } catch (error) {
        return new ServerMessage(true, "A ocurrido un error actualizando el usuario", error);
      }
    }
  }

  async getAllRespuestas( dependencia ): Promise<ServerMessage> {
    let dataResponse: any = {
      respuestas: [Respuestas]
    };
    try {
      dataResponse.respuestas = await this.respuestasRepository.findAll<Respuestas>({
        /* attributes: ['idrespuestas','dependencia','pregunta1complemento','programapresupuestal','usuario','estatus'], */
        /* where: {
          dependencia: dependencia,
        }, */
        order: [
          ['idrespuestas', 'DESC'],
        ],
        include: [{
          model: CatapoyosSociales,
          attributes: ['apoyo_social'],
        }, {
          model: CatobjetivosPolitica,
          attributes: ['politica'],
        }, {
          model: Validaciones,
        }, {
          model: ValidacionesManuales,
        }]
      }).map(async (respuesta: Respuestas) => {
        let respuestasp1 = await this.respuestasp1Repository.findAll<Respuestasp1>({
          attributes: ['sujeto'],
          where: {
            idrespuesta: respuesta.idrespuestas,
          }
        }).map((respuesta1: any) => {
          return Object.assign(respuesta1.sujeto)
        });
        //Dio ERRIR
        let respuestasp2 = [];

        try {
          let respuestasp2Temp : any[] = await this.respuestasp2complementoRepository.findAll<Respuestasp2complemento>({
            where: {
              idrespuesta: respuesta.idrespuestas,
            },
            include: [{
              model: Catderechos,
              attributes: ['derecho'],
            }]
          })/* .map((respuestas2: any) => {
            return Object.assign(respuestas2.respuesta.derecho)
          }); */

          for (let index = 0; index < respuestasp2Temp.length; index++) {
            respuestasp2.push(respuestasp2Temp[index].respuesta);
          }
        } catch (error) {
          respuestasp2 = error;
        }
        

        let programa: any = await this.catprogramasRepository.findOne<Catprogramas>({
          // attributes: ['nombre_programa'], 
          where: {
            idprograma: respuesta.programapresupuestal,
          }
        });

        let user = await this.userRepository.findOne<User>({
          attributes: ['nombre', 'apellidos','email'],
          where: { idusuarios: respuesta.usuario }
        });

        let titular = await this.catDependenciasRepository.findOne<CatDependencias>({
          //attributes: ['titular'],
          where: { clavedependencia: Number(respuesta.dependencia) }
        });

        return Object.assign(
          {
            idrespuestas: respuesta.idrespuestas,
            dependencia: respuesta.dependencia ? respuesta.dependencia : 'Sin Dependencia',
            programa: programa ? programa.nombre_programa : "Sin Programa",
            usuario: user ? user.nombre.toLocaleUpperCase() + ' ' + user.apellidos.toLocaleUpperCase() : 'Sin Usuario',
            usuarioEmail: user.email,
            titular: titular ? titular.titular : 'Sin Titular',
            estatus: respuesta.estatus ? respuesta.estatus : false,
            respuestasp1: respuestasp1 ? respuestasp1 : [],
            respuestasp2: respuestasp2, //DIO ERROR
            validaciones: respuesta.validaciones,
            validacionesManuales: respuesta.validacionesManuales,
            //Respuestas
            respuestas: {
              pregunta1complemento: respuesta.pregunta1complemento ? respuesta.pregunta1complemento : "",
              pregunta2: respuesta.pregunta2 ? respuesta.pregunta2 : "no",
              pregunta3: respuesta.pregunta3 ? respuesta.pregunta3 : "no",
              pregunta3complemento: respuesta.pregunta3complemento ? respuesta.pregunta3complemento : "",
              pregunta4: respuesta.pregunta4 ? respuesta.pregunta4 : "no",
              pregunta4complemento: respuesta.pregunta4complemento ? respuesta.pregunta4complemento : "",
              pregunta5: respuesta.pregunta5 ? respuesta.pregunta5 : "no",
              pregunta5otro: respuesta.pregunta5otro,
              pregunta5complemento: respuesta.pregunta5complementoFix ? respuesta.pregunta5complementoFix.apoyo_social : "",
              pregunta6: respuesta.pregunta6 ? respuesta.pregunta6 : "no",
              pregunta7: respuesta.pregunta7 ? respuesta.pregunta7 : "no",
              pregunta8: respuesta.pregunta8 ? respuesta.pregunta8 : "no",
              pregunta8complemento: respuesta.pregunta8complementoFix ? respuesta.pregunta8complementoFix.politica : "",
              pregunta9: respuesta.pregunta9 ? respuesta.pregunta9 : "no",
              pregunta10: respuesta.pregunta10 ? respuesta.pregunta10 : "no",
              pregunta10complemento: respuesta.pregunta10complemento ? respuesta.pregunta10complemento : "",
              pregunta11: respuesta.pregunta11 ? respuesta.pregunta11 : "no",
              pregunta11complemento: respuesta.pregunta11complemento ? respuesta.pregunta11complemento : "",
              pregunta12: respuesta.pregunta12 ? respuesta.pregunta12 : "no",
              pregunta12complemento: respuesta.pregunta12complemento ? respuesta.pregunta12complemento : "",
              aclaraciones : respuesta.aclaraciones
            },
            program : programa
          })
      });

      dataResponse.entities = await await this.respuestasRepository.findAll<Respuestas>({
        attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('dependencia')) ,'dependencia'],
        ]
      }).map((entidad : any) => {
        return Object.assign(entidad.dependencia)
      });

      return new ServerMessage(false, "Respuestas obtenidas con éxito", dataResponse);
    } catch (error) {
      //console.log(error)
      return new ServerMessage(true, "Error obteniendo respuestas", error);
    }
  }

  async saveRespuestas(data: any): Promise<ServerMessage> {
    //console.log(respuestas);
    var respuestas: any = {
      pregunta1complemento: data.pregunta1.sujetoOtroText ? data.pregunta1.sujetoOtroText : "",
      pregunta2: data.pregunta2.value ? data.pregunta2.value : "",
      pregunta3: data.pregunta3.value ? data.pregunta3.value : "",
      pregunta3complemento: data.pregunta3.complemento ? data.pregunta3.complemento : "",
      pregunta4: data.pregunta4.value ? data.pregunta4.value : "",
      pregunta4complemento: data.pregunta4.complemento ? data.pregunta4.complemento : "",
      pregunta5: data.pregunta5.value ? data.pregunta5.value : "",
      pregunta6: data.pregunta6 ? data.pregunta6 : "",
      pregunta7: data.pregunta7 ? data.pregunta7 : "",
      pregunta8: data.pregunta8.value ? data.pregunta8.value : "",
      pregunta8complemento: data.pregunta8.complemento ? data.pregunta8.complemento : 0,
      pregunta9: data.pregunta9 ? data.pregunta9 : "",
      pregunta10: data.pregunta10.value ? data.pregunta10.value : "",
      pregunta10complemento: data.pregunta10.complemento ? data.pregunta10.complemento : "",
      pregunta11: data.pregunta11.value ? data.pregunta11.value : "",
      pregunta11complemento: data.pregunta11.complemento ? data.pregunta11.complemento : "",
      pregunta12: data.pregunta12.value ? data.pregunta12.value : "",
      pregunta12complemento: data.pregunta12.complemento ? data.pregunta12.complemento : "",
      dependencia: data.dependencia ? data.dependencia : "",
      programapresupuestal: data.programapresupuestal ? data.programapresupuestal : "",
      pregunta5complemento: data.pregunta5.complemento ? data.pregunta5.complemento : 0,
      usuario: data.usuario ? data.usuario : 0,
      estatus: data.estatus ? data.estatus : 0,
      aclaraciones: data.aclaraciones ? data.aclaraciones : "",
      pregunta5otro : data.pregunta5otro ? data.pregunta5otro : ""
    };
    try {
      var newRespuestas: Respuestas = await this.respuestasRepository.create<Respuestas>(respuestas, {});
      // Resultado 1. El Programa Presupuestario es de enfoque social
      let validacion1a = newRespuestas.pregunta2.toString() == 'si' ? true : false;
      // 2. El Programa Presupuestario coadyuva en el desarrollo social de las personas:
      let validacion2a = (newRespuestas.pregunta2.toString() == 'si' && newRespuestas.pregunta3.toString() == 'si') ? true : false;
      // 3. El programa va dirigido a sujetos de derecho prioritarios?
      let validacion3a = false;
      for (let index = 0; index < data.pregunta2.derechos.length; index++) {
        if (data.pregunta2.derechos[index] == 'sujetoninasninos' || data.pregunta2.derechos[index] == 'sujetoadolescentes'
          || data.pregunta2.derechos[index] == 'sujetojovenes' || data.pregunta2.derechos[index] == 'sujetomujeres'
          || data.pregunta2.derechos[index] == 'sujetomayores60' || data.pregunta2.derechos[index] == 'sujetodiscapacidad'
          || data.pregunta2.derechos[index] == 'sujetoindigenas' || data.pregunta2.derechos[index] == 'sujetojornaleras'
          || data.pregunta2.derechos[index] == 'sujetomigrantes') {
          validacion3a = true;
        }
      }
      // 4. El Programa Presupuestario se enfoca al desarrollo de capacidades en la población beneficiaria:
      let validacion4a = newRespuestas.pregunta4.toString() == 'desarrollocapacidades' ? true : false;
      // 5. El programa otorga algún tipo de apoyo:
      let validacion5a = newRespuestas.pregunta5.toString() == 'si' ? true : false;
      // 6. El programa está sujeto a Reglas de Operación:
      let validacion6a = newRespuestas.pregunta12.toString() == 'si' ? true : false;
      let validacion6acomentarios = 
        validacion6a && 
        (validacion1a || validacion2a)
        ? "Deberia contar con ellas" : "";

      // 7. El programa cuenta con padrón general de beneficiarios?
      let validacion7a = newRespuestas.pregunta11.toString() == 'si' ? true : false;
      let validacion7acomentarios = 
        !validacion7a && 
        (validacion5a || newRespuestas.pregunta1complemento != 'funcionario')
        ? "Deberia contar con padron." : "";
      
      let validaciones = {
        idrespuesta: newRespuestas.idrespuestas,
        validacion1: false,
        validacion1a: validacion1a,
        validacion1justificacion: "",
        validacion2: false,
        validacion2a: validacion2a,
        validacion2justificacion: "",
        validacion3: false,
        validacion3a: validacion3a,
        validacion3justificacion: "",
        validacion4: false,
        validacion4a: validacion4a,
        validacion4justificacion: "",
        validacion5: false,
        validacion5a: validacion5a,
        validacion5justificacion: "",
        validacion6: false,
        validacion6a: validacion6a,
        validacion6justificacion: validacion6acomentarios,
        validacion6comentarios: "",
        validacion7: false,
        validacion7a: validacion7a,
        validacion7justificacion: "",
        validacion7comentarios: validacion7acomentarios,
      };

      try {
        var newValidaciones: Validaciones = await this.validacionesRepository.create<Validaciones>(validaciones, {});
        var newValidacionesManuales: ValidacionesManuales = await this.validacionesManualesRepository.create<ValidacionesManuales>(validaciones, {});
        try {
          //Guardado de las respuestas de la pregunta 2
          for (var key in data.pregunta1) {
            if (data.pregunta1.hasOwnProperty(key) && key != 'sujetoOtroText') {
              /* console.log(key + " -> " + data.pregunta1[key]); */
              if (data.pregunta1[key]) {
                var newRespuestasp1: Respuestasp1 = await this.respuestasp1Repository.create<Respuestasp1>(
                  { idrespuesta: newRespuestas.idrespuestas, sujeto: key }, { /* fields: ['idrespuesta', 'sujeto'] */ });
              }
            }
          }
          try {
            //Guardado de las respuestas de la pregunta 3
            for (let index = 0; index < data.pregunta2.derechos.length; index++) {
              if (data.pregunta2.derechos[index]) {
                var respuestasp2comp: Respuestasp2complemento = await this.respuestasp2complementoRepository.create<Respuestasp2complemento>(
                  { idrespuesta: newRespuestas.idrespuestas, derecho: (index + 1) }, { /* fields: ['idrespuesta', 'derecho'] */ });
              }
            }
            return new ServerMessage(false, "Respuestas guardadadas correctamente",/* newRespuestas */{});
          } catch (error) {
            return new ServerMessage(true, "Error guardando las respuestas de la pregunta 3",/* newRespuestas */error);
          }
        } catch (error) {
          return new ServerMessage(true, "Error guardando las respuestas de la pregunta 2",/* newRespuestas */error);
        }
      } catch (error) {
        return new ServerMessage(true, "Error guardando las validaciones",/* newRespuestas */error);
      }

    } catch (error) {
      return new ServerMessage(true, "Error guardando las respuestas", error);
    }

  }

  async upCreateValidations(data, idrespuesta): Promise<ServerMessage> {
    try {
      let validacionesManuales = await this.validacionesManualesRepository.findOne({
        where: { idrespuesta: idrespuesta }
      });
      // update
      if (validacionesManuales != null && validacionesManuales != undefined){
        try {
          let updatedValidations = await validacionesManuales.update(data);

          let respuestas = await this.respuestasRepository.findOne({
            where: { idrespuestas: idrespuesta }
          });
          respuestas.estatus = 1;
          respuestas.save();
          return new ServerMessage(false, "Validaciones finales actualizadas con exito", updatedValidations)
        } catch (error) {
          return new ServerMessage(true, "Error actualizando validaciones", error);
        }
      }
      try {
      // insert
        let createdValidations = await this.validacionesRepository.create(data);
        let respuestas = await this.respuestasRepository.findOne({
          where: { idrespuestas: idrespuesta }
        });
        respuestas.estatus = 1;
        respuestas.save();
        return new ServerMessage(false, "Validaciones creadas y actualizads con exito", createdValidations) 
      } catch (error) {
        return new ServerMessage(true, "Error creando validaciones", error);
      }
    } catch (error) {
      return new ServerMessage(true, "Error consultando las validaciones", error);
    }
  }
}