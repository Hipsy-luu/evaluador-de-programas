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
  HasOne,
  HasMany,
  ForeignKey
} from 'sequelize-typescript';

@Table({
  tableName: 'validaciones_manuales',
})
export class ValidacionesManuales extends Model<ValidacionesManuales> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public id : number;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public idrespuesta : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion1 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion1a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion1justificacion : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion2 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion2a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion2justificacion : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion3 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion3a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion3justificacion : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion4 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion4a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion4justificacion : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion5 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion5a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion5justificacion : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion6 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion6a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion6justificacion : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    defaultValue: null,
  })
  public validacion6comentarios : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  public validacion7 : string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public validacion7a : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public validacion7justificacion : string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    defaultValue: null,
  })
  public validacion7comentarios : string;

}