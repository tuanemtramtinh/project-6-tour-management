import { Application } from "express"
import tourRoute from "./tour.route";
import categoryRoute from "./category.route";

const clientRoute = (app: Application) => {
  app.use("/tours", tourRoute);
  app.use("/categories", categoryRoute);
}

export default clientRoute;