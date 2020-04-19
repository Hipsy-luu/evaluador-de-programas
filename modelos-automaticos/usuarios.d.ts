import { Model, BuildOptions } from 'sequelize';
export interface IUsuariosAttributes {
  idusuarios: number,
  usuario: string,
  nombre: string,
  apellidos: string,
  password: string,
  entidad: string,
  extension: string,
  rolusuario: number,
}
export interface IUsuariosModel extends IUsuariosAttributes, Model {}
export type IUsuariosModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUsuariosModel;
};