import { Task } from "../model/task-repository-interface";
import { ITaskRepository } from "../model/task-repository-interface";
import { NotFoundError } from "../../errors";

export class GetTaskUsecase {
  private readonly taskRepository: ITaskRepository;

  private constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public static getInstance(taskRepository: ITaskRepository): GetTaskUsecase {
    return new GetTaskUsecase(taskRepository);
  }

  public async execute(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  }
}
