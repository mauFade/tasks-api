import { CreateTaskResponseDTO, ITask } from "../dto";
import { ITaskRepository, Task } from "../model/task-repository-interface";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export class TaskRepository implements ITaskRepository {
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): TaskRepository {
    return new TaskRepository();
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) return undefined;

    return Task.newTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  public async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
    });

    return tasks.map((task: any) =>
      Task.newTask({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })
    );
  }

  public async create(data: ITask): Promise<CreateTaskResponseDTO> {
    const task = await this.prisma.task.create({
      data: {
        id: randomUUID(),
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        userId: data.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  public async update(id: string, data: Partial<ITask>): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return Task.newTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
