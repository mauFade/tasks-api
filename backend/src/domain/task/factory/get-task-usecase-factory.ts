import { taskRepositoryFactory } from "../repository/task-repository-factory";
import { GetTaskUsecase } from "../usecase/get-task-use-case";

export function getTaskUsecaseFactory(): GetTaskUsecase {
  return GetTaskUsecase.getInstance(taskRepositoryFactory());
}
