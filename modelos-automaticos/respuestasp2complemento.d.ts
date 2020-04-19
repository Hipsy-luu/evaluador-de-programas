import { Model, BuildOptions } from 'sequelize';
export interface IRespuestasp2ComplementoAttributes {
  id: number,
  idrespuesta: number,
  derecho?: number,
}
export interface IRespuestasp2ComplementoModel extends IRespuestasp2ComplementoAttributes, Model {}
export type IRespuestasp2ComplementoModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IRespuestasp2ComplementoModel;
};