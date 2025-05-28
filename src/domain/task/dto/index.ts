export interface ITask {
  title: string;
  description?: string;
  status: string;
  dueDate: Date;
  userId: string;
}

export interface CreateTaskResponseDTO {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskConstructorDTO extends ITask {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
