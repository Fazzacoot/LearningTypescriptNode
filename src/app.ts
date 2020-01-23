//Normal commonjs import
//const express = require('express');
import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { json } from "body-parser";

const app = express();

app.use(json());



app.use("/todos", todoRoutes);

//Error handling function
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("listining on port 3000");
});
