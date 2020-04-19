import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    idrespuesta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idrespuesta"
    },
    sujeto: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sujeto"
    }
  };
  const options = {
    tableName: "respuestasp1",
    comment: "",
    indexes: []
  };
  const Respuestasp1Model = sequelize.define("respuestasp1_model", attributes, options);
  return Respuestasp1Model;
}