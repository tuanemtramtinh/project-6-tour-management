import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../configs/database";
import { QueryTypes } from "sequelize";

export const index = async (req: Request, res: Response) => {
  try {
    /*
    SELECT tours.*, price * (1 - discount/100) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = 'du-lich-trong-nuoc'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
    */
    const slugCategory = req.params.slugCategory;

    const tours = await sequelize.query(
      `
      SELECT tours.*, price * (1 - discount/100) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
        categories.slug = 'du-lich-trong-nuoc'
        AND categories.deleted = false
        AND categories.status = 'active'
        AND tours.deleted = false
        AND tours.status = 'active';  
    `,
      {
        type: QueryTypes.SELECT,
      }
    );

    for (const item of tours) {
      if (item["images"]) {
        item["images"] = JSON.parse(item["images"]);
        item["image"] = item["images"][0];
        item["price_special"] = parseInt(item["price_special"]);
      }
    }

    res.render("clients/pages/tours/index", {
      pageTitle: "Danh sách tour",
      tours: tours,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    /* 
    SELECT *
    FROM tours
    WHERE slug = ':slugTour'
      AND deleted = false
      AND status = 'active';
    */

    const slugTour = req.params.slugTour;

    const tourDetail = await Tour.findOne({
      where: {
        slug: slugTour,
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    if (tourDetail["images"]) {
      tourDetail["images"] = JSON.parse(tourDetail["images"]);
    }

    tourDetail["price_special"] =
      (1 - tourDetail["discount"] / 100) * tourDetail["price"];

    res.render("clients/pages/tours/detail", {
      pageTitle: "Chi tiết tour",
      tourDetail: tourDetail,
    });
  } catch (error) {
    console.log(error);
  }
};
