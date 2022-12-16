import express from "express";
import controller from "../controllers/RequestBlood";
import { verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", verifyJWT, controller.createRequestBlood);
router.get("/get/:requestId", verifyJWT, controller.readRequestBlood);
router.get("/get", verifyJWT, controller.readAll);
router.patch("/update/:requestId", verifyJWT, controller.updateRequestBlood);
router.delete("/delete/:requestId", verifyJWT, controller.deleteRequestBlood);

export = router;
