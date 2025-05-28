import { ITaskRepository } from "../model/task-repository-interface";
import { NotFoundError } from "../../errors";

export class DeleteTaskUsecase {
  private readonly taskRepository: ITaskRepository;

  private constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public static getInstance(
    taskRepository: ITaskRepository
  ): DeleteTaskUsecase {
    return new DeleteTaskUsecase(taskRepository);
  }

  public async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    await this.taskRepository.delete(id);
  }
}
