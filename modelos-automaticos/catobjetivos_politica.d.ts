import { Model, BuildOptions } from 'sequelize';
export interface ICatobjetivosPoliticaAttributes {
  idpolitica: number,
  politica?: string,
}
export interface ICatobjetivosPoliticaModel extends ICatobjetivosPoliticaAttributes, Model {}
export type ICatobjetivosPoliticaModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatobjetivosPoliticaModel;
};