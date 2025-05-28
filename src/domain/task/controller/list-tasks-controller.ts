import { Request, Response } from "express";
import { listTasksUsecaseFactory } from "../factory/list-tasks-usecase-factory";

export class ListTasksController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const taskService = listTasksUsecaseFactory();

    const tasks = await taskService.execute(userId);

    return response.status(200).json(tasks);
  }
}
