import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/create-todo").post(createTodo);

router.route("/").get(getAllTodos);

router.route("/:todoId").get(getTodoById).patch(updateTodo).delete(deleteTodo);

export default router;
