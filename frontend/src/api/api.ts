import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    this.axios.interceptors.request.use((config) => {
      const token = getCookie("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public async signup(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{
    id: string;
    email: string;
    name: string;
    token: string;
  }> {
    const response = await this.axios.post(`/users`, data);
    return response.data;
  }

  public async login(data: { email: string; password: string }): Promise<{
    id: string;
    name: string;
    token: string;
  }> {
    const response = await this.axios.post(`/users/authenticate`, data);
    return response.data;
  }

  public async createTask(data: {
    title: string;
    description: string;
    status: string;
  }): Promise<{
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.post(`/tasks`, data);
    return response.data;
  }

  public async getTasks(): Promise<
    {
      id: string;
      title: string;
      description: string;
      status: string;
      dueDate: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
    }[]
  > {
    const response = await this.axios.get(`/tasks`);

    return response.data;
  }

  public async getTaskById(id: string): Promise<{
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.get(`/tasks/${id}`);
    return response.data;
  }

  public async updateTask(data: {
    id: string;
    title: string;
    description: string;
    status: string;
  }): Promise<{
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.put(`/tasks/${data.id}`, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    return response.data;
  }

  public async deleteTask(id: string): Promise<void> {
    await this.axios.delete(`/tasks/${id}`);
  }
}

export const api = new Api();
