import { Request, Response } from "express";
import Category from "../../models/category.model";

export const index = async (req: Request, res: Response) => {
  try {
    // SELECT * FROM categories WHERE deleted = false AND status = "active";
    const categories = await Category.findAll({
      where: {
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    res.render("clients/pages/categories/index", {
      pageTitle: "Danh mục tour",
      categories: categories,
    });
    
  } catch (error) {
    console.log(error);
  }
};
