import { Request, Response } from "express";
import { getTaskUsecaseFactory } from "../factory/get-task-usecase-factory";

export class GetTaskController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const taskService = getTaskUsecaseFactory();

    const task = await taskService.execute(id);

    return response.status(200).json(task);
  }
}
