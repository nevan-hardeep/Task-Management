import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/tasks";
import SearchBar from "../components/searchbar";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";

function TaskPage() {
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // Filter and search computation logic stays here
  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    });

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      <TaskTable
        tasks={filteredTasks}
        onDelete={deleteTask}
        onComplete={toggleComplete}
        onEdit={(task: Task) => {
          // Navigates back to the main form page and loads up the task data
          navigate("/", { state: { editingTask: task } });
        }}
      />
    </div>
  );
}

export default TaskPage;