import { useState } from "react";
import { Category, Task } from "../types/tasks";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/taskform";
import SearchBar from "../components/searchbar";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";

function TaskList() {
  const { tasks, addTask, deleteTask, toggleComplete, editTask } = useTasks();
  const [view, setView] = useState<"create" | "list">("create");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Work");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editingTask) {
      await editTask(editingTask.id, title, category);
      setEditingTask(null);
    } else {
      await addTask(title, category);
    }

    setTitle("");
    setCategory("Work");
    setView("list"); 
  };

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    });

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2>{view === "create" ? (editingTask ? "Edit Task" : "Create Task") : "Task Dashboard"}</h2>
        <div className="d-flex gap-2">
          <button 
            className={`btn ${view === "create" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setEditingTask(null);
              setTitle("");
              setCategory("Work");
              setView("create");
            }}
          >
            Create Task
          </button>
          <button 
            className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("list")}
          >
            View Tasks
          </button>
        </div>
      </div>

      {view === "create" ? (
        <div className="card p-4 shadow-sm">
          <TaskForm
            title={title}
            category={category}
            setTitle={setTitle}
            setCategory={setCategory}
            handleSubmit={handleSubmit}
            isEditing={editingTask !== null}
          />
        </div>
      ) : (
        <div>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="col-md-6">
              <FilterBar filter={filter} setFilter={setFilter} />
            </div>
          </div>
          <TaskTable
            tasks={filteredTasks}
            onDelete={deleteTask}
            onComplete={toggleComplete}
            onEdit={(task) => {
              setEditingTask(task);
              setTitle(task.title);
              setCategory(task.category);
              setView("create");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default TaskList;