import Scheduled from "../models/ScheduledModel.js";
import { Sequelize, Op } from "sequelize";
import Users from "../models/UserModel.js";
import Categories from "../models/CategoryModel.js";

export const getScheduled = async (req, res) => {
  try {
    const response = await Scheduled.findAll({
      attributes: [
        "uuid",
        "amount",
        "type",
        "start_date",
        "end_date",
        "description",
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

export const getScheduledById = async (req, res) => {
  try {
    const response = await Scheduled.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createScheduled = async (req, res) => {
  const { amount, type, start_date, end_date, description } = req.body;
  const user_id = 1;
  const category_id = 4;
  try {
    await Scheduled.create({
      amount: amount,
      type: type,
      start_date: start_date,
      end_date: end_date,
      description: description,
      userId: user_id,
      categoryId: category_id,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateScheduled = async (req, res) => {
  const { category_id, amount, is_scheduled } = req.body;
  const scheduled = await Scheduled.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!scheduled)
    return res.status(404).json({ msg: "Jadwal tidak ditemukan" });
  try {
    await Scheduled.update(
      {
        category_id: category_id,
        amount: amount,
        is_scheduled: is_scheduled,
      },
      {
        where: {
          id: scheduled.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteScheduled = async (req, res) => {
  const scheduled = await Scheduled.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!scheduled)
    return res.status(404).json({ msg: "Jadwal tidak ditemukan" });
  try {
    await Scheduled.destroy({
      where: {
        id: scheduled.id,
      },
    });
    res.status(200).json({ msg: "Jadwal berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
