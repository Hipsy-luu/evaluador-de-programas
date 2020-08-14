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
  tableName: 'catderechos',
})
export class Catderechos extends Model<Catderechos> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idcatderechos : number;

  @Column({
    type: DataType.STRING(450),
    allowNull: false,
  })
  public derecho : string;
  

  /* @BelongsTo(() => Respuestasp2complemento, 'idrespuesta')
  respuesta: Respuestasp2complemento; */
}