import { taskRepositoryFactory } from "../repository/task-repository-factory";
import { ListTasksUsecase } from "../usecase/list-tasks-use-case";

export function listTasksUsecaseFactory(): ListTasksUsecase {
  return ListTasksUsecase.getInstance(taskRepositoryFactory());
}
