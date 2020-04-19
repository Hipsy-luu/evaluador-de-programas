import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    idpolitica: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idpolitica"
    },
    politica: {
      type: DataTypes.STRING(450),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "politica"
    }
  };
  const options = {
    tableName: "catobjetivos_politica",
    comment: "",
    indexes: []
  };
  const CatobjetivosPoliticaModel = sequelize.define("catobjetivos_politica_model", attributes, options);
  return CatobjetivosPoliticaModel;
}