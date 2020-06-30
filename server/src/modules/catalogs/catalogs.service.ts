import { Injectable, Inject } from '@nestjs/common';
import { Catprogramas } from '../../models/catprogramas.entity';
import { ServerMessage } from '../../utils/dtos/serverMessages.dto';
import { Sequelize } from 'sequelize';

@Injectable()
export class CatalogsService {
    constructor(
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('CatprogramasRepository') private readonly catprogramasRepository: typeof Catprogramas,
        /* @Inject('BandRepository') private readonly bandRepository: typeof Band, */
      ) {}

    async getCatProgramasByEntidad(entidad:number): Promise<ServerMessage> {
        let catalogo = await this.catprogramasRepository.findAll<Catprogramas>({
          attributes: [
            'idprograma', 
            'entidad',
            'departamento',
            'nombre_programa',
            'clave_presupuestaria'
            //[Sequelize.fn('DISTINCT', Sequelize.col('nombre_programa')) ,'nombre_programa'],
            //[Sequelize.literal('DISTINCT `nombre_programa`'), 'nombre_programa'],
          ],
          group: ['nombre_programa'],
          where: {entidad: entidad},});
        return new ServerMessage(false,"Catalogo obtenido", catalogo)
    }
}
