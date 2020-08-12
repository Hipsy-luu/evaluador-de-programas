import { Module } from '@nestjs/common';
//Se importa el modulo de la base de datos para hacer disponible la instancia en el servicio
import { DatabaseModule } from '../../database/database.module';
//import into any module that contains routes we want to protect with our JWT authorisation. 
import { PassportModule } from '@nestjs/passport';

//Se le asigna el servicio al modulo
import { UserService } from './user.service';
//Se le asigna el controlador encargado de las rutas al modulo
import { UserController } from './user.controller';
//Con esto se importa de algun modo la tabla de usuarios para poderla inyectar en el servicio
import { userProviders } from '../../models/repositoriesModels/user.providers';
import { respuestasProviders } from '../../models/repositoriesModels/respuestas.providers';
import { respuestasp1Providers } from '../../models/repositoriesModels/respuestasp1.providers';
import { respuestasp2complementoProviders } from '../../models/repositoriesModels/respuestasp2complemento.providers';
import { catprogramasProviders } from '../../models/repositoriesModels/catprogramas.providers';
import { catderechosProviders } from '../../models/repositoriesModels/catderechos.providers';
import { validacionesProviders } from '../../models/repositoriesModels/validaciones.providers';
import { validacionesManualesProviders } from '../../models/repositoriesModels/validacionesManuales.providers';
import { catDependenciasProviders } from '../../models/repositoriesModels/catdependencias.providers';
/* import { bandProviders } from '../../models/repositoriesModels/band.providers'; */

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService, 
    ...userProviders,
    ...respuestasProviders,
    ...respuestasp1Providers,
    ...respuestasp2complementoProviders,
    ...catprogramasProviders,
    ...catderechosProviders,
    ...validacionesProviders,
    ...validacionesManualesProviders,
    ...catDependenciasProviders
    /* ...bandProviders */
  ],
})

export class UserModule {}