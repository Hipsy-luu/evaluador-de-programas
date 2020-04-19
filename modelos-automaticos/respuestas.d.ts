import { Model, BuildOptions } from 'sequelize';
export interface IRespuestasAttributes {
  idrespuestas: number,
  pregunta1complemento?: string,
  pregunta2: string,
  pregunta3: string,
  pregunta3complemento?: string,
  pregunta4: string,
  pregunta4complemento?: string,
  pregunta5: string,
  pregunta6: string,
  pregunta7: string,
  pregunta8: string,
  pregunta8complemento?: number,
  pregunta9: string,
  pregunta10: string,
  pregunta10complemento?: string,
  pregunta11: string,
  pregunta11complemento?: string,
  pregunta12: string,
  pregunta12complemento?: string,
  dependencia?: string,
  programapresupuestal?: string,
  pregunta5complemento?: number,
  usuario?: number,
  estatus?: number,
}
export interface IRespuestasModel extends IRespuestasAttributes, Model {}
export type IRespuestasModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IRespuestasModel;
};