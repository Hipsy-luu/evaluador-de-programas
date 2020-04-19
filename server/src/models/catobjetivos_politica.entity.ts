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
  tableName: 'catobjetivos_politica',
})
export class CatobjetivosPolitica extends Model<CatobjetivosPolitica> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idpolitica : number;

  @Column({
    type: DataType.STRING(450),
    allowNull: false,
  })
  public politica : string;
  

  /* @BelongsTo(() => Respuestasp2complemento, 'idrespuesta')
  respuesta: Respuestasp2complemento; */
}