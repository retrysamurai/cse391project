import express from "express";
import { createUser, readUser, readAll, updateUser, deleteUser, login, verifyJWT, ReqWithJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/get/:userId", readUser);
router.get("/get", readAll);
router.patch("/update", verifyJWT, updateUser);
router.delete("/delete/:userId", verifyJWT, deleteUser);

export = router;
