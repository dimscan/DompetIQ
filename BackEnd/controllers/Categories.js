import Categories from "../models/CategoryModel.js";
import { Sequelize } from "sequelize";
import Users from "../models/UserModel.js";

export const getCategories = async (req, res) => {
  try {
    const response = await Categories.findAll({
      attributes: [
        "uuid",
        "name",
        "type",
        [Sequelize.col("user.username"), "user"],
      ],
      include: [
        {
          model: Users,
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
export const getCategoryById = async (req, res) => {
  try {
    const response = await Categories.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "type"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createCategory = async (req, res) => {
  const { name, type } = req.body;
  const user_id = 1;
  try {
    await Categories.create({
      name: name,
      type: type,
      userId: user_id,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const { name, type } = req.body;
  const category = await Categories.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category)
    return res.status(404).json({ msg: "Kategori tidak ditemukan" });
  try {
    await Categories.update(
      {
        name: name,
        type: type,
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
export const deleteCategory = async (req, res) => {
  const category = await Categories.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category)
    return res.status(404).json({ msg: "Kategori tidak ditemukan" });
  try {
    await Categories.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
