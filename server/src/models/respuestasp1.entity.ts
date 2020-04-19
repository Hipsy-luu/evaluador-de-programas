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
import { Respuestas } from './respuestas.entity';
/* import { Band } from './band.entity'; */

@Table({
  tableName: 'respuestasp1',
})
export class Respuestasp1 extends Model<Respuestasp1> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public id : number;

  @ForeignKey(() => Respuestas)
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public idrespuesta : number;
  
  @Column({
    type: DataType.STRING(45),
    allowNull: true,
  })
  public sujeto : string;

  /* @BelongsTo(() => Respuestas, 'idrespuestas')
  respuesta: Respuestas; */
}