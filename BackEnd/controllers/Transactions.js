import Transactions from "../models/TransactionModel.js";
import { Sequelize } from "sequelize";
import Users from "../models/UserModel.js";
import Categories from "../models/CategoryModel.js";

export const getTransactions = async (req, res) => {
  try {
    const response = await Transactions.findAll({
      attributes: [
        "uuid",
        "amount",
        "is_scheduled",
        [Sequelize.literal("user.username"), "user"],
        [Sequelize.literal("category.name"), "category"],
      ],
      include: [
        {
          model: Users,
          attributes: [],
        },
        {
          model: Categories,
          attributes: [],
        },
      ],
      raw: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const getTransactionById = async (req, res) => {
  try {
    const response = await Transactions.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "amount", "is_scheduled"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createTransaction = async (req, res) => {
  const { amount, is_scheduled } = req.body;
  const user_id = 1;
  const category_id = 2;
  try {
    await Transactions.create({
      amount: amount,
      is_scheduled: is_scheduled,
      userId: user_id,
      categoryId: category_id,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateTransaction = async (req, res) => {
  const { amount, is_scheduled } = req.body;
  const transaction = await Transactions.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!transaction)
    return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
  try {
    await Transactions.update(
      {
        amount: amount,
        is_scheduled: is_scheduled,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteTransaction = async (req, res) => {
  const transaction = await Transactions.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!transaction)
    return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
  try {
    await Transactions.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Transaksi berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
