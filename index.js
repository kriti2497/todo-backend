const express = require("express");
const {
  createTodo,
  getTodoList,
  deleteTodo,
  updateStatus,
} = require("./controllers/todo.controller");
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require("./config/db");

connectDB();

app.use(express.json());

app.post("/create-todo", createTodo);
app.get("/get-todos", getTodoList);
app.put("/update-todo/:todoId", updateStatus);

app.delete("/delete-todo/:todoId", deleteTodo);

app.listen(PORT, () => {
  console.log("Server started successfully on port", PORT);
});
