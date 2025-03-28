import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Categories from "./CategoryModel.js";

const { DataTypes } = Sequelize;

const Transactions = db.define(
  "transactions",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
      defaultValue: "income",
      validate: {
        notEmpty: true,
      },
    },
    is_scheduled: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: false,
      defaultValue: "false",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Transactions);
Transactions.belongsTo(Users);
Categories.hasMany(Transactions);
Transactions.belongsTo(Categories);

export default Transactions;
