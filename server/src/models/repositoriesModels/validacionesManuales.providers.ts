import { ValidacionesManuales } from './../validacionesManuales.entity';

//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const validacionesManualesProviders = [
  {
    provide: 'ValidacionesManualesRepository',
    useValue: ValidacionesManuales,
  },
];