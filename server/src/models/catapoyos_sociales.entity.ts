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
  ForeignKey
} from 'sequelize-typescript';
import { Respuestasp2complemento } from './respuestasp2complemento.entity';
/* import { Band } from './band.entity'; */

@Table({
  tableName: 'catapoyos_sociales',
})
export class CatapoyosSociales extends Model<CatapoyosSociales> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idapoyo_social : number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public apoyo_social : number;
  

  /* @BelongsTo(() => Respuestasp2complemento, 'idrespuesta')
  respuesta: Respuestasp2complemento; */
}