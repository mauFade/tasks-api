import { CreateTaskResponseDTO, ITask } from "../dto";
import { ITaskRepository } from "../model/task-repository-interface";

export class CreateTaskUsecase {
  private readonly taskRepository: ITaskRepository;

  private constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public static getInstance(
    taskRepository: ITaskRepository
  ): CreateTaskUsecase {
    return new CreateTaskUsecase(taskRepository);
  }

  public async execute(data: ITask): Promise<CreateTaskResponseDTO> {
    const task = await this.taskRepository.create(data);

    return task;
  }
}
