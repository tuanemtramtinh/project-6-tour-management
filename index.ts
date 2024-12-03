import { Application, Request, Response } from "express";
import express from "express";
import sequelize from "./configs/database";
import dotenv from "dotenv";
import Tour from "./models/tour.model";
import clientRoute from "./routes/clients/index.route";

dotenv.config();

const app: Application = express();
const port: number = 3000;

//Connect to database
sequelize;

app.set('views', `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set('view engine', 'pug'); // template engine sử dụng: pug
app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục chứa file tĩnh

clientRoute(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
