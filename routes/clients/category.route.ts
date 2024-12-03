import express, { Router } from "express";
import * as controller from "../../controllers/clients/category.controller";

const router: Router = express.Router();

router.get("/", controller.index);

const categoryRoute = router;

export default categoryRoute;
