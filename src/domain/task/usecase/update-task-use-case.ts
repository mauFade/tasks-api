import { ITask } from "../dto";
import { Task } from "../model/task-repository-interface";
import { ITaskRepository } from "../model/task-repository-interface";
import { NotFoundError } from "../../errors";

export class UpdateTaskUsecase {
  private readonly taskRepository: ITaskRepository;

  private constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public static getInstance(
    taskRepository: ITaskRepository
  ): UpdateTaskUsecase {
    return new UpdateTaskUsecase(taskRepository);
  }

  public async execute(id: string, data: Partial<ITask>): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    const updatedTask = await this.taskRepository.update(id, data);

    return updatedTask;
  }
}
