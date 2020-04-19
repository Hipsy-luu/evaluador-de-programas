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
import { Catderechos } from './catderechos.entity';
/* import { Band } from './band.entity'; */

@Table({
  tableName: 'respuestasp2complemento',
})
export class Respuestasp2complemento extends Model<Respuestasp2complemento> {
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
  
  @ForeignKey(() => Catderechos)
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: true,
  })
  public derecho : number;

  @BelongsTo(() => Catderechos, 'derecho')
  respuesta: Catderechos;
}