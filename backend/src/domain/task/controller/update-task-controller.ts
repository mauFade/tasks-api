import { Request, Response } from "express";
import { updateTaskUsecaseFactory } from "../factory/update-task-usecase-factory";

export class UpdateTaskController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, status, dueDate } = request.body;

    const taskService = updateTaskUsecaseFactory();

    const task = await taskService.execute(id, {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return response.status(200).json(task);
  }
}
