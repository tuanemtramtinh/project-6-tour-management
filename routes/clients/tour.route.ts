import express, { Router } from "express";
import * as controller from "../../controllers/clients/tour.controller";

const router: Router = express.Router();

router.get("/:slugCategory", controller.index);

router.get("/detail/:slugTour", controller.detail);


const tourRoute = router;

export default tourRoute;
