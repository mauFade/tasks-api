import { CreateTaskResponseDTO, ITask, TaskConstructorDTO } from "../dto";

export class Task {
  private id: string;
  private title: string;
  private description: string | null;
  private status: string;
  private dueDate: Date;
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(data: TaskConstructorDTO) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || null;
    this.status = data.status;
    this.dueDate = data.dueDate;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static newTask(data: TaskConstructorDTO): Task {
    return new Task(data);
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public getStatus(): string {
    return this.status;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export interface ITaskRepository {
  create(data: ITask): Promise<CreateTaskResponseDTO>;
  findById(id: string): Promise<Task | undefined>;
  findByUserId(userId: string): Promise<Task[]>;
  update(id: string, data: Partial<ITask>): Promise<Task>;
  delete(id: string): Promise<void>;
}
