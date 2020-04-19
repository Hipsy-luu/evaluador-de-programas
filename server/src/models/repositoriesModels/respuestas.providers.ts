import { Respuestas } from '../respuestas.entity';

//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const respuestasProviders = [
  {
    provide: 'RespuestasRepository',
    useValue: Respuestas,
  },
];