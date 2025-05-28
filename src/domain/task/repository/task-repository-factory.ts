import { TaskRepository } from "./task-repository";

export function taskRepositoryFactory(): TaskRepository {
  return TaskRepository.getInstance();
}
