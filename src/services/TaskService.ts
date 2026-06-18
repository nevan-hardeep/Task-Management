import axios from "axios";

// Aligned port with your main running Spring Boot instance
const API_URL = "http://localhost:8081/api/tasks";

export interface Task {
  id?: number;
  title: string;
  category: string;
  status: "Pending" | "Completed";
}

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((t: any) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      status: t.status || "Pending"
    }));
  } catch (error) {
    console.error("Error fetching tasks from server:", error);
    return [];
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};