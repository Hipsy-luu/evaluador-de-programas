//import { Sequelize, DataType } from 'sequelize';

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
  tableName: 'catdependencias',
})
export class CatDependencias extends Model<CatDependencias> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public iddependencia : number;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  public clavedependencia : number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public nombre : string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public titular : string;

}