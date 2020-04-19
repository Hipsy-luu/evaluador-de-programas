import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    idcatderechos: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idcatderechos",
      unique: "idcatderechos_UNIQUE"
    },
    derecho: {
      type: DataTypes.STRING(450),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "derecho"
    }
  };
  const options = {
    tableName: "catderechos",
    comment: "",
    indexes: []
  };
  const CatderechosModel = sequelize.define("catderechos_model", attributes, options);
  return CatderechosModel;
}