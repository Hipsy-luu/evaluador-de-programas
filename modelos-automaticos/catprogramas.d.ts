import { Model, BuildOptions } from 'sequelize';
export interface ICatprogramasAttributes {
  idprograma: number,
  entidad: number,
  departamento: string,
  nombre_programa: string,
  clave_presupuestaria: string,
  cla_programatica: string,
  definicion_programa: string,
  descipcion_fin: string,
  descipcion_objetivo: string,
  poblacion_objetivo: string,
  cantidad_hombres: string,
  cantidad_mujeres: string,
  sujeto_social: string,
  nivel_alineacion_pnd: number,
  alineacion_pnd_2013_2018: string,
  descripcion_alineacion_pnd: string,
  nivel_alineacion_ped: string,
  alineacion_ped_2017_2021: string,
  descripcion_alineacion_ped: string,
  descripcion_pmp: string,
  nivel_alineacion_pmp: number,
  alineacion_pmp?: string,
  descripcion_alineacion_pmp?: string,
  nivel_alineacion_ods_meta: number,
  alineacion_ods_meta: string,
  descripcion_alineacion_ods_meta: string,
}
export interface ICatprogramasModel extends ICatprogramasAttributes, Model {}
export type ICatprogramasModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatprogramasModel;
};