import Todo from "../models/todo.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !dueDate) {
    throw new ApiError(400, "All fields are required");
  }

  const currentTime = Date.now();
  const dueDateTime = new Date(dueDate);
  if (dueDateTime <= currentTime) {
    throw new ApiError(400, "Due date must be in the future");
  }

  const userId = req.user._id;

  const todo = new Todo({
    title,
    description: description || "",
    dueDate: dueDateTime,
    createdBy: userId,
  });

  await todo.save();

  return res.status(200).json(new ApiResponse(200, todo, "Todo created"));
});

const getAllTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const todos = await Todo.find({ createdBy: userId });

  return res.status(200).json(new ApiResponse(200, todos, "Todos fetched"));
});

const getTodoById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  if (todo.createdBy.toString() !== userId.toString()) {
    throw new ApiError(401, "Unauthorized");
  }

  return res.status(200).json(new ApiResponse(200, todo, "Todo fetched"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  if (
    ![title, description, dueDate, completed].some(
      (field) => field?.trim() !== "",
    )
  ) {
    throw new ApiError(400, "Atleast one field is required");
  }
  if (dueDate) {
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      throw new ApiError(400, "Invalid dueDate format");
    }
    if (dueDateObj <= Date.now()) {
      throw new ApiError(400, "dueDate must be in the future");
    }
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    throw new ApiError(400, "Completed must be a boolean");
  }

  const { todoId } = req.params;

  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }
  if (description) {
    updateFields.description = description;
  }
  if (dueDate) {
    updateFields.dueDate = dueDate;
  }
  if (typeof completed === "boolean") {
    updateFields.completed = completed;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateFields, {
    new: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated"));
});

const markTodoComplete = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  if (todo.createdBy.toString() !== userId.toString()) {
    throw new ApiError(401, "Unauthorized");
  }

  todo.completed = true;
  await todo.save();

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo marked completed"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { todoId } = req.params;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  if (todo.createdBy.toString() !== userId.toString()) {
    throw new ApiError(401, "Unauthorized");
  }

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTodo, "Todo deleted"));
});

export {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  markTodoComplete,
  deleteTodo,
};
