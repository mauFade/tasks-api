import { taskRepositoryFactory } from "../repository/task-repository-factory";
import { CreateTaskUsecase } from "../usecase/create-task-use-case";

export function createTaskUsecaseFactory(): CreateTaskUsecase {
  return CreateTaskUsecase.getInstance(taskRepositoryFactory());
}
