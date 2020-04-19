import { Model, BuildOptions } from 'sequelize';
export interface ICatrespuestasp8Attributes {
  idrespuesta: number,
  catRespuestasp8col?: string,
}
export interface ICatrespuestasp8Model extends ICatrespuestasp8Attributes, Model {}
export type ICatrespuestasp8ModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatrespuestasp8Model;
};