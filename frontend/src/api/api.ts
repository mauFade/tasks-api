import axios from "axios";

class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8081";
  }

  public async signup(data: { name: string; email: string; password: string }) {
    const response = await axios.post(`${this.baseUrl}/users`, data);
    return response.data;
  }

  public async login(data: { email: string; password: string }) {
    const response = await axios.post(
      `${this.baseUrl}/users/authenticate`,
      data
    );
    return response.data;
  }
}

export const api = new Api();
