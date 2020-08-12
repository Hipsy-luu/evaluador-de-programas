import { CatDependencias } from '../catdependencias.entity';

//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const catDependenciasProviders = [
  {
    provide: 'CatDependenciasRepository',
    useValue: CatDependencias,
  },
];