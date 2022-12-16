import express from "express";
import controller from "../controllers/DonateBlood";
import { verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", verifyJWT, controller.createDonateBlood);
router.get("/get/:donateId", verifyJWT, controller.readDonateBlood);
router.get("/get", verifyJWT, controller.readAll);
router.patch("/update/:donateId", verifyJWT, controller.updateDonateBlood);
router.delete("/delete/:donateId", verifyJWT, controller.deleteDonateBlood);

export = router;
