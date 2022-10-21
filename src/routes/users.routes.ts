import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
} from "../controllers/users.controllers";
import authMiddleware from "../middlewares/verifyAuth.middleware";
import isAdmMiddleware from "../middlewares/verifyisAdm.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", authMiddleware, isAdmMiddleware, listUsersController);
userRoutes.get("/:id", authMiddleware, retrieveUserController);
userRoutes.patch("/:id", authMiddleware, updateUserController);
userRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmMiddleware,
  deleteUserController
);

export default userRoutes;
