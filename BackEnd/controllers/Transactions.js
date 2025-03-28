import Transactions from "../models/TransactionModel.js";
import { Sequelize } from "sequelize";
import Users from "../models/UserModel.js";
import Categories from "../models/CategoryModel.js";

export const getTransactions = async (req, res) => {
  try {
    // Dapatkan parameter query
    const { start_date, end_date, category_id, type } = req.query;

    // Buat kondisi where
    const where = {};

    // Filter berdasarkan rentang tanggal
    if (start_date && end_date) {
      where.start_date = {
        [Op.between]: [new Date(start_date), new Date(end_date)],
      };
    } else if (start_date) {
      where.start_date = { [Op.gte]: new Date(start_date) };
    } else if (end_date) {
      where.start_date = { [Op.lte]: new Date(end_date) };
    }

    // Filter berdasarkan tipe (daily/weekly/monthly)
    if (type && ["daily", "weekly", "monthly"].includes(type)) {
      where.type = type;
    }

    // Buat kondisi include untuk kategori
    const include = [
      {
        model: Users,
        attributes: [],
      },
      {
        model: Categories,
        attributes: [],
        where: category_id ? { id: category_id } : undefined,
      },
    ];
    const response = await Transactions.findAll({
      attributes: [
        "uuid",
        "amount",
        "type",
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
  const { amount, type, is_scheduled } = req.body;
  const user_id = 1;
  const category_id = 4;
  try {
    await Transactions.create({
      amount: amount,
      type: type,
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
