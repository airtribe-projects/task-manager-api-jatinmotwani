const { Router } = require("express");
const tasksStore = require("../task.json");

const router = Router();

// Helper function to find task by id
function findTaskById(id) {
  return tasksStore.tasks.find(task => task.id === id);
}

router.get('/', (req, res) => {
  res.status(200).json(tasksStore.tasks); 
});

router.get('/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });

  const task = findTaskById(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  res.status(200).json(task);
});

router.post('/', (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const maxId = tasksStore.tasks.reduce((max, task) => Math.max(max, task.id), 0);
  const newTask = {
    id: maxId + 1,
    title,
    description,
    completed
  };

  tasksStore.tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put('/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });

  const task = findTaskById(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, completed } = req.body;

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid input" });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  res.status(200).json(task);
});

router.delete('/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });

  const task = findTaskById(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  tasksStore.tasks = tasksStore.tasks.filter(task => task.id !== taskId);

  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
