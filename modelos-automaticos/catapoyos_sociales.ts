import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    idapoyo_social: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idapoyo_social"
    },
    apoyo_social: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "apoyo_social"
    }
  };
  const options = {
    tableName: "catapoyos_sociales",
    comment: "",
    indexes: []
  };
  const CatapoyosSocialesModel = sequelize.define("catapoyos_sociales_model", attributes, options);
  return CatapoyosSocialesModel;
}