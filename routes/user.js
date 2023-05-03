import express  from "express";
import { User } from "../models/user.js";
import { Test, getUserById, login, logout, newUser, viewAll } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all" ,viewAll)

router.post("/new" ,newUser)
router.post("/login" ,login)
router.get("/logout" ,logout)

router.get("/userid/test",Test)

// router.route("/userid/:id").get(getUserById).put(updateUserById).delete(deleteUserById);

router.get("/me",isAuthenticated , getUserById)
// router.put("/userid/:id" , updateUserById)
// router.delete("/userid/:id" , deleteUserById)

export default router;