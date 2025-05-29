import axios from "axios";

class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8081";
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
    const response = await axios.post(`${this.baseUrl}/users`, data);
    return response.data;
  }

  public async login(data: { email: string; password: string }): Promise<{
    id: string;
    name: string;
    token: string;
  }> {
    const response = await axios.post(
      `${this.baseUrl}/users/authenticate`,
      data
    );
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
    const response = await axios.post(`${this.baseUrl}/tasks`, data);
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
    const response = await axios.get(`${this.baseUrl}/tasks`);
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
    const response = await axios.get(`${this.baseUrl}/tasks/${id}`);
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
    const response = await axios.put(`${this.baseUrl}/tasks/${data.id}`, data);
    return response.data;
  }

  public async deleteTask(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/tasks/${id}`);
  }
}

export const api = new Api();
