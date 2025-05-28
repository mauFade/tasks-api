import { Request, Response } from "express";
import { deleteTaskUsecaseFactory } from "../factory/delete-task-usecase-factory";

export class DeleteTaskController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const taskService = deleteTaskUsecaseFactory();

    await taskService.execute(id);

    return response.status(204).send();
  }
}
