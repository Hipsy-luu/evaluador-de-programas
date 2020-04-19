import { Model, BuildOptions } from 'sequelize';
export interface IRespuestasp1Attributes {
  id: number,
  idrespuesta: number,
  sujeto?: string,
}
export interface IRespuestasp1Model extends IRespuestasp1Attributes, Model {}
export type IRespuestasp1ModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IRespuestasp1Model;
};