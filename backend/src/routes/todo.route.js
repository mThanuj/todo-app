import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  markTodoComplete,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/create-todo").post(createTodo);

router.route("/").get(getAllTodos);

router
  .route("/:todoId")
  .get(getTodoById)
  .patch(updateTodo)
  .patch()
  .delete(deleteTodo);

router.route("/complete/:todoId").patch(markTodoComplete);

export default router;
