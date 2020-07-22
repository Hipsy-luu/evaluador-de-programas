import { ValidacionesManuales } from './../models/validacionesManuales.entity';
import { Sequelize } from 'sequelize-typescript';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */
//import { SEQUELIZE } from '../utils/constants';
import { User } from '../models/user.entity';
import { Catprogramas } from '../models/catprogramas.entity';
import { Respuestas } from '../models/respuestas.entity';
import { Respuestasp1 } from '../models/respuestasp1.entity';
import { Respuestasp2complemento } from '../models/respuestasp2complemento.entity';
import { Catderechos } from '../models/catderechos.entity';
import { CatapoyosSociales } from '../models/catapoyos_sociales.entity';
import { CatobjetivosPolitica } from '../models/catobjetivos_politica.entity';
import { Validaciones } from '../models/validaciones.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        define: {
          timestamps: false
        },
        logging : false,
        host: 'localhost',
        port: 3306,
        username: 'rootsec',
        password: '123456789',
        database: 'evprogramas',
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to 
       * Sequelize later on.
       */
      sequelize.addModels([
        User,
        Catprogramas,
        Respuestas,
        Respuestasp1,
        Respuestasp2complemento,
        Catderechos,
        CatapoyosSociales,
        CatobjetivosPolitica,
        Validaciones,
        ValidacionesManuales
      ]);

      await sequelize.sync();
      
      return sequelize;
    },
  },
];