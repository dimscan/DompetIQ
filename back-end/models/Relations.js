import Budgets from "./BudgetModel.js";
import Categories from "./CategoryModel.js";
import Scheduled from "./ScheduledModel.js";
import Transactions from "./TransactionModel.js";
import Users from "./UserModel.js";

export function setupRelations() {
  //Relation Categories
  Categories.hasMany(Budgets);
  Budgets.belongsTo(Categories);
  Categories.hasMany(Transactions);
  Transactions.belongsTo(Categories);
  Categories.hasMany(Scheduled);
  Scheduled.belongsTo(Categories);
  Categories.belongsTo(Users);
  Users.hasMany(Categories);

  //Relation Transactions
  Transactions.belongsTo(Users);
  Users.hasMany(Transactions);
  Transactions.belongsTo(Categories);
  Categories.hasMany(Transactions);

  //Relation Scheduled
  Scheduled.belongsTo(Users);
  Users.hasMany(Scheduled);
  Scheduled.belongsTo(Categories);
  Categories.hasMany(Scheduled);

  //Relation Budgets
  Users.hasMany(Budgets);
  Budgets.belongsTo(Users);
}
