import { Model, BuildOptions } from 'sequelize';
export interface ICatapoyosSocialesAttributes {
  idapoyo_social: number,
  apoyo_social: string,
}
export interface ICatapoyosSocialesModel extends ICatapoyosSocialesAttributes, Model {}
export type ICatapoyosSocialesModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatapoyosSocialesModel;
};