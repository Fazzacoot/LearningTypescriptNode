"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todos_1 = require("../models/todos");
const TODOS = [];
//RequestHandler use insted of defining each var in the function
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created TODO", createdTodo: newTodo });
};
exports.getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.updateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Not found");
    }
    TODOS[todoIndex] = new todos_1.Todo(TODOS[todoIndex].id, updatedText);
    res.status(200).json({ message: "Updated", todos: TODOS[todoIndex] });
};
exports.deleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Not found");
    }
    TODOS.splice(todoIndex, 1);
    res.status(200).json({ message: "TODO Deleted" });
};
