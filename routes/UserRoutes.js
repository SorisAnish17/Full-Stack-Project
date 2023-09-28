import express from "express";
import {
  createUser,
  allUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/UserControllers.js";
const router = express.Router();

//createUser
//http://localhost:5000/api/v1/user/create
router.post("/create", createUser);

//allUser
//http://localhost:5000/api/v1/user/all
router.get("/allUser", allUser);

//singleUser
//http://localhost:5000/api/v1/user/:id
router.get("/:id", getUser);

//updateUser
//http://localhost:5000/api/v1/user/:id
router.put("/:id", updateUser);

//deleteUser
router.delete("/:id", deleteUser);

export default router;
