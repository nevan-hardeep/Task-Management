import axios from "axios";

const API_URL = "http://localhost:8081/api/users";

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const registerUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};

export const loginUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/login`, user);
  return response.data;
};