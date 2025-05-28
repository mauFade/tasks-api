import { CreateUserResponseDTO, IUser } from "../dto";
import { IUserRepository, User } from "../model/user-repository-interface";

export class UserRepository implements IUserRepository {
  private constructor() {}

  public static getInstance(): UserRepository {
    return new UserRepository();
  }

  public async findById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  public async create(data: IUser): Promise<CreateUserResponseDTO> {
    throw new Error("Method not implemented.");
  }
}
