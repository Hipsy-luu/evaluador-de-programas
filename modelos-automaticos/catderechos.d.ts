import { Model, BuildOptions } from 'sequelize';
export interface ICatderechosAttributes {
  idcatderechos: number,
  derecho?: string,
}
export interface ICatderechosModel extends ICatderechosAttributes, Model {}
export type ICatderechosModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatderechosModel;
};