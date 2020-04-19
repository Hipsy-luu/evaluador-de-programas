//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  /* CreatedAt,
  UpdatedAt, */
  DeletedAt,
  BeforeUpdate,
  BeforeCreate,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
/* import { Band } from './band.entity'; */

@Table({
  tableName: 'catprogramas',
})
export class Catprogramas extends Model<Catprogramas> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idprograma : number;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public entidad : number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public departamento : string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public nombre_programa : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public clave_presupuestaria : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public cla_programatica : string;

  @Column({
    type: DataType.STRING(800),
    allowNull: false,
  })
  public definicion_programa : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public descipcion_fin : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public descipcion_objetivo : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public poblacion_objetivo : string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  public cantidad_hombres : string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  public cantidad_mujeres : string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public sujeto_social : string;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public nivel_alineacion_pnd : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public alineacion_pnd_2013_2018 : string;

  @Column({
    type: DataType.STRING(350),
    allowNull: false,
  })
  public descripcion_alineacion_pnd : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public nivel_alineacion_ped : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public alineacion_ped_2017_2021 : string;

  @Column({
    type: DataType.STRING(450),
    allowNull: false,
  })
  public descripcion_alineacion_ped : string;

  @Column({
    type: DataType.STRING(90),
    allowNull: false,
  })
  public descripcion_pmp : string;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public nivel_alineacion_pmp : number;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    defaultValue: null,
  })
  public alineacion_pmp : string;

  @Column({
    type: DataType.STRING(450),
    allowNull: true,
    defaultValue: null,
  })
  public descripcion_alineacion_pmp : string;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public nivel_alineacion_ods_meta : number;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public alineacion_ods_meta : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public descripcion_alineacion_ods_meta : string;

}