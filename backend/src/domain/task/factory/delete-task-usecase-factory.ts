import { taskRepositoryFactory } from "../repository/task-repository-factory";
import { DeleteTaskUsecase } from "../usecase/delete-task-use-case";

export function deleteTaskUsecaseFactory(): DeleteTaskUsecase {
  return DeleteTaskUsecase.getInstance(taskRepositoryFactory());
}
