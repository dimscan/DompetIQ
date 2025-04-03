import Budgets from "../models/BudgetModel.js";
import Users from "../models/UserModel.js";

export const createBudget = async (req, res) => {
  try {
    const { category_id, period, amount, start_date, end_date } = req.body;
    await Budgets.create({
      category_id: category_id,
      period: period,
      amount: amount,
      start_date: start_date,
      end_date: end_date,
      userId: req.userId,
    });
    res.status(201).json("Budget created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budgets.findAll({
      where: {
        userId: req.userId,
      },
      attributes: [
        "uuid",
        "category_id",
        "amount",
        "period",
        "start_date",
        "end_date",
      ],
      include: [
        {
          model: Users,
          attributes: ["username", "email"],
        },
      ],
    });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const budget = await Budgets.findOne({
      where: {
        userId: req.userId,
        uuid: req.params.id,
      },
      attributes: [
        "uuid",
        "category_id",
        "amount",
        "period",
        "start_date",
        "end_date",
      ],
      include: [
        {
          model: Users,
          attributes: ["username", "email"],
        },
      ],
    });
    if (!budget)
      return res
        .status(404)
        .json({ error: `Budget ${req.params.id} not found` });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBudget = async (req, res) => {
  const { category_id, period, amount, start_date, end_date } = req.body;
  const budget = await Budgets.findOne({
    where: {
      userId: req.userId,
      uuid: req.params.id,
    },
  });
  if (!budget)
    return res.status(404).json({ error: `Budget ${req.params.id} not found` });
  try {
    await Budgets.update(
      {
        category_id,
        period,
        amount,
        start_date,
        end_date,
      },
      {
        where: {
          uuid: req.params.id,
          userId: req.userId,
        },
      }
    );
    res.status(200).json({ msg: "Budget updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  const budget = await Budgets.findOne({
    where: {
      userId: req.userId,
      uuid: req.params.id,
    },
  });
  if (!budget)
    return res.status(404).json({ error: `Budget ${req.params.id} not found` });
  try {
    await Budgets.destroy({
      where: {
        userId: req.userId,
        uuid: req.params.id,
      },
    });
    res.status(200).json("Budget deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
