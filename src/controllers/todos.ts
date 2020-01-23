import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [];
//RequestHandler use insted of defining each var in the function
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: "Created TODO", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Not found");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({ message: "Updated", todos: TODOS[todoIndex] });
};

export const deleteTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Not found");
  }
  TODOS.splice(todoIndex, 1);
  res.status(200).json({ message: "TODO Deleted" });
};
