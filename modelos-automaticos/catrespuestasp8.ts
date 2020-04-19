import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    idrespuesta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idrespuesta"
    },
    catRespuestasp8col: {
      type: DataTypes.STRING(450),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "catRespuestasp8col"
    }
  };
  const options = {
    tableName: "catrespuestasp8",
    comment: "",
    indexes: []
  };
  const Catrespuestasp8Model = sequelize.define("catrespuestasp8_model", attributes, options);
  return Catrespuestasp8Model;
}