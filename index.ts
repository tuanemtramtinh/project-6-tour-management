import { Application, Request, Response } from "express";
import express from "express";
import sequelize from "./configs/database";
import dotenv from "dotenv";
import Tour from "./models/tour.model";

dotenv.config();

const app: Application = express();
const port: number = 3000;

//Connect to database
sequelize;

app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active",
    },
    raw: true,
  });

  console.log(tours);

  res.send("Hello");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
