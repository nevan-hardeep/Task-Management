import { Task } from "../types/tasks";

const STORAGE_KEY = "tasks";

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);

  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
};