import { Model, BuildOptions } from 'sequelize';
export interface IValidacionesAttributes {
  id: number,
  idrespuesta: number,
  validacion1?: number,
  validacion1a: number,
  validacion1justificacion: string,
  validacion2?: number,
  validacion2a: number,
  validacion2justificacion: string,
  validacion3?: number,
  validacion3a: number,
  validacion3justificacion: string,
  validacion4?: number,
  validacion4a: number,
  validacion4justificacion: string,
  validacion5?: number,
  validacion5a: number,
  validacion5justificacion: string,
  validacion6?: number,
  validacion6a: number,
  validacion6justificacion: string,
  validacion6comentarios?: number,
  validacion7?: number,
  validacion7a: number,
  validacion7justificacion: string,
  validacion7comentarios?: number,
}
export interface IValidacionesModel extends IValidacionesAttributes, Model {}
export type IValidacionesModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IValidacionesModel;
};