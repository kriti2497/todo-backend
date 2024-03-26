const TodoSchema = require("../models/todo.model");

async function getTodoList(req, res) {
  console.log("first");
  try {
    // TODO: where clause to avoid entries where isDeleted is true
    const list = await TodoSchema.find();
    return res.json(list);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

async function createTodo(req, res) {
  try {
    const { title } = req.body;
    if (!title?.trim())
      return res.status(400).send("Please enter title of todo");

    const todoObj = {
      title,
      status: "todo",
      isDeleted: false,
    };

    await TodoSchema.create(todoObj);

    return res.status(201).json({ msg: "Todo added successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function updateStatus(req, res) {
  const statuses = ["todo", "in-progress", "done"];
  try {
    const { todoId } = req.params;
    const { newStatus } = req.body;
    const todoToUpdate = await TodoSchema.findById(todoId);

    if (!newStatus)
      return res.status(400).send("Please enter the status to update");

    if (!statuses.includes(newStatus))
      return res.status(400).send("Invalid status");

    if (!todoToUpdate) return res.status(404).send("Todo not found");

    todoToUpdate.status = newStatus;

    await todoToUpdate.save();
    return res.status(200).json({ msg: "Status for todo updated" });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

async function deleteTodo(req, res) {
  try {
    const { todoId } = req.params;

    const toDeleteTodo = await TodoSchema.findById(todoId);
    if (!toDeleteTodo)
      return res.status(404).json({ msg: "No such todo available" });

    await toDeleteTodo.deleteOne();

    return res.json({ msg: "Todo has been deleted successfully." });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

exports.deleteTodo = deleteTodo;

exports.updateStatus = updateStatus;

exports.createTodo = createTodo;

exports.getTodoList = getTodoList;
