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
import { Respuestasp1 } from './respuestasp1.entity';
import { Respuestasp2complemento } from './respuestasp2complemento.entity';
import { Catprogramas } from './catprogramas.entity';
import { CatapoyosSociales } from './catapoyos_sociales.entity';
import { CatobjetivosPolitica } from './catobjetivos_politica.entity';
import { Validaciones } from './validaciones.entity';

@Table({
  tableName: 'respuestas',
})
export class Respuestas extends Model<Respuestas> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idrespuestas : number;

  @HasMany(() => Respuestasp1,'idrespuesta')
  respuestasp1: Respuestasp1[]; 

  @HasMany(() => Respuestasp2complemento,'idrespuesta')
  respuestasp2: Respuestasp2complemento[]; 

  @HasOne(() => Catprogramas, 'idprograma')
  programa: Catprogramas;

  @HasOne(() => Validaciones, 'idrespuesta')
  validaciones: Validaciones;

  @Column({
    type: DataType.STRING(75),
    allowNull: true,
  })
  public pregunta1complemento : string;
  
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta2 : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta3 : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  public pregunta3complemento : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta4 : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  public pregunta4complemento : string;
  
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta5 : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta6 : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta7 : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta8 : string;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: true,
  })
  public pregunta8complemento : number;

  @BelongsTo(() => CatobjetivosPolitica, 'pregunta8complemento')
  pregunta8complementoFix: CatobjetivosPolitica;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta9 : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta10 : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  public pregunta10complemento : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta11 : string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public pregunta11complemento : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  public pregunta12 : string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  public pregunta12complemento : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
  })
  public dependencia : string;

  @ForeignKey(() => Catprogramas)
  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  public programapresupuestal : string;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: true,
  })
  public pregunta5complemento : number;

  @BelongsTo(() => CatapoyosSociales, 'pregunta5complemento')
  pregunta5complementoFix: CatapoyosSociales;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: true,
  })
  public usuario : number;

  @Column({
    type: DataType.INTEGER({length : 4}),
    allowNull: true,
  })
  public estatus : number;


}