const TodoSchema = require("../models/todo.model");

async function getTodoList(req, res) {
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
    const { title, description } = req.body;
    if (!title?.trim())
      return res.status(400).send("Please enter title of todo");

    if (!description?.trim())
      return res.status(400).send("Please enter description of todo");

    const todoObj = {
      title,
      description,
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
    console.log(req.body);
    const { newStatus, description, title } = req.body;
    const todoToUpdate = await TodoSchema.findById(todoId);

    if (!newStatus || !description || !title)
      return res.status(400).send("Please enter the status to update");

    if (!newStatus && !statuses.includes(newStatus))
      return res.status(400).send("Invalid status");

    if (!todoToUpdate) return res.status(404).send("Todo not found");

    if (newStatus) todoToUpdate.status = newStatus;
    if (title) todoToUpdate.title = title;
    if (description) todoToUpdate.description = description;

    await todoToUpdate.save();
    return res.status(200).json({ msg: "Todo updated" });
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
