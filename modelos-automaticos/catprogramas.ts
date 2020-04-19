import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    idprograma: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idprograma"
    },
    entidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "entidad"
    },
    departamento: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "departamento"
    },
    nombre_programa: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre_programa"
    },
    clave_presupuestaria: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "clave_presupuestaria"
    },
    cla_programatica: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cla_programatica"
    },
    definicion_programa: {
      type: DataTypes.STRING(800),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "definicion_programa"
    },
    descipcion_fin: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descipcion_fin"
    },
    descipcion_objetivo: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descipcion_objetivo"
    },
    poblacion_objetivo: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "poblacion_objetivo"
    },
    cantidad_hombres: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cantidad_hombres"
    },
    cantidad_mujeres: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cantidad_mujeres"
    },
    sujeto_social: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sujeto_social"
    },
    nivel_alineacion_pnd: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nivel_alineacion_pnd"
    },
    alineacion_pnd_2013_2018: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alineacion_pnd_2013_2018"
    },
    descripcion_alineacion_pnd: {
      type: DataTypes.STRING(350),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion_alineacion_pnd"
    },
    nivel_alineacion_ped: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nivel_alineacion_ped"
    },
    alineacion_ped_2017_2021: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alineacion_ped_2017_2021"
    },
    descripcion_alineacion_ped: {
      type: DataTypes.STRING(450),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion_alineacion_ped"
    },
    descripcion_pmp: {
      type: DataTypes.STRING(90),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion_pmp"
    },
    nivel_alineacion_pmp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nivel_alineacion_pmp"
    },
    alineacion_pmp: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alineacion_pmp"
    },
    descripcion_alineacion_pmp: {
      type: DataTypes.STRING(450),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion_alineacion_pmp"
    },
    nivel_alineacion_ods_meta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nivel_alineacion_ods_meta"
    },
    alineacion_ods_meta: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alineacion_ods_meta"
    },
    descripcion_alineacion_ods_meta: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion_alineacion_ods_meta"
    }
  };
  const options = {
    tableName: "catprogramas",
    comment: "",
    indexes: []
  };
  const CatprogramasModel = sequelize.define("catprogramas_model", attributes, options);
  return CatprogramasModel;
}