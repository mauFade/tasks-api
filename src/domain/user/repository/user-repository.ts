import { CreateUserResponseDTO, IUser } from "../dto";
import { IUserRepository, User } from "../model/user-repository-interface";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): UserRepository {
    return new UserRepository();
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return undefined;

    return User.newUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return undefined;

    return User.newUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async create(data: IUser): Promise<CreateUserResponseDTO> {
    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
