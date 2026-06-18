import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../types/tasks";

export interface Task {
  id: number;
  title: string;
  category: Category;
  status: "Pending" | "Completed";
  completed: boolean;
}

// Ensure it points to port 8081 just like user registration!
const API_URL = "http://localhost:8081/api/tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      const mappedTasks = response.data.map((task: any) => ({
        ...task,
        completed: task.status === "Completed"
      }));
      setTasks(mappedTasks);
    } catch (err) {
      console.error("Error reading database tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string, category: Category) => {
    try {
      await axios.post(API_URL, { title, category, status: "Pending" });
      await fetchTasks();
    } catch (err) {
      console.error("Error writing task to database:", err);
    }
  };

  const toggleComplete = async (id: number) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;
    try {
      const updatedStatus = targetTask.status === "Pending" ? "Completed" : "Pending";
      await axios.put(`${API_URL}/${id}`, {
        id: targetTask.id,
        title: targetTask.title,
        category: targetTask.category,
        status: updatedStatus
      });
      await fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting database row:", err);
    }
  };

  const editTask = async (id: number, title: string, category: Category) => {
    const targetTask = tasks.find(t => t.id === id);
    try {
      await axios.put(`${API_URL}/${id}`, {
        id,
        title,
        category,
        status: targetTask ? targetTask.status : "Pending"
      });
      await fetchTasks();
    } catch (err) {
      console.error("Error editing task row:", err);
    }
  };

  return { tasks, addTask, deleteTask, toggleComplete, editTask, refreshTasks: fetchTasks };
};