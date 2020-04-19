import { Respuestasp1 } from '../respuestasp1.entity';

//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const respuestasp1Providers = [
  {
    provide: 'Respuestasp1Repository',
    useValue: Respuestasp1,
  },
];