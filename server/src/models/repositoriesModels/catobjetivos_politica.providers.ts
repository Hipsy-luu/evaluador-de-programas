import { CatobjetivosPolitica } from '../catobjetivos_politica.entity';


//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const catobjetivosPoliticaProviders = [
  {
    provide: 'CatobjetivosPoliticaRepository',
    useValue: CatobjetivosPolitica,
  },
];