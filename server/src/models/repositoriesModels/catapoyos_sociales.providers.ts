import { CatapoyosSociales } from '../catapoyos_sociales.entity';


//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const catapoyosSocialesProviders = [
  {
    provide: 'CatapoyosSocialesRepository',
    useValue: CatapoyosSociales,
  },
];