import { Task } from "../model/task-repository-interface";
import { ITaskRepository } from "../model/task-repository-interface";

export class ListTasksUsecase {
  private readonly taskRepository: ITaskRepository;

  private constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public static getInstance(taskRepository: ITaskRepository): ListTasksUsecase {
    return new ListTasksUsecase(taskRepository);
  }

  public async execute(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUserId(userId);

    return tasks;
  }
}
