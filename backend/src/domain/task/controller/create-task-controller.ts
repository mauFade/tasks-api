import { Request, Response } from "express";
import { createTaskUsecaseFactory } from "../factory/create-task-usecase-factory";

export class CreateTaskController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, status, dueDate } = request.body;
    const userId = request.user.id;

    const taskService = createTaskUsecaseFactory();

    const task = await taskService.execute({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      userId,
    });

    return response.status(201).json(task);
  }
}
