//import { Sequelize, DataType } from 'sequelize';
//import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  DeletedAt,
  BeforeUpdate,
  BeforeCreate,
  BelongsTo
} from 'sequelize-typescript';

import { User } from './user.entity';

@Table({
  tableName: 'band',
})
export class Band extends Model<Band> {
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  band_id: number;

  //@ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  user_id: number;


  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  state_id: number;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: false,
  })
  town_id: number;

  @Column({
    type: DataType.INTEGER({length : 4}),
    allowNull: false,
    defaultValue: "1",
  })
  active: number;

  @Column({
    type: DataType.INTEGER({length : 11}),
    allowNull: true,
    defaultValue: "0",
  })
  reviews?: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
    defaultValue: "0.0",
  })
  score?: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: "/no_image.jpg",
  })
  photo: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  integrated: string;

  @Column({
    type: DataType.INTEGER({length : 4}),
    allowNull: false,
  })
  members: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  agent: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  base_price: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(600),
    allowNull: true,
    defaultValue: null,
  })
  description?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  web_page?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  facebook?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  sound_cloud?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  twitter?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  instagram?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: null,
  })
  youtube?: string;


  /*@CreatedAt({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: "0000-00-00 00:00:00",
  })*/
  @CreatedAt created_at: Date;

  /*@Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: "0000-00-00 00:00:00",
  })*/
  @UpdatedAt updated_at: Date;
  
  /*@BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: Person) {
    // this will be called when an instance is created or updated
    instance.name = instance.name.toLocaleUpperCase();
  }*/
}