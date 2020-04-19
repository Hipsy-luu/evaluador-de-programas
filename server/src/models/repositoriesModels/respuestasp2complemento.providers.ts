import { Respuestasp2complemento } from '../respuestasp2complemento.entity';

//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const respuestasp2complementoProviders = [
  {
    provide: 'Respuestasp2complementoRepository',
    useValue: Respuestasp2complemento,
  },
];