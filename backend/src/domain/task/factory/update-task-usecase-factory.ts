import { taskRepositoryFactory } from "../repository/task-repository-factory";
import { UpdateTaskUsecase } from "../usecase/update-task-use-case";

export function updateTaskUsecaseFactory(): UpdateTaskUsecase {
  return UpdateTaskUsecase.getInstance(taskRepositoryFactory());
}
