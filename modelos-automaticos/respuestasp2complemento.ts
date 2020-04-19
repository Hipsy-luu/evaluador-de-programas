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
    derecho: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "derecho"
    }
  };
  const options = {
    tableName: "respuestasp2complemento",
    comment: "",
    indexes: []
  };
  const Respuestasp2ComplementoModel = sequelize.define("respuestasp2complemento_model", attributes, options);
  return Respuestasp2ComplementoModel;
}