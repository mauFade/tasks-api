import { IBCryptRepository } from "../../../infra/bcrypt/model";
import { CreateUserResponseDTO, IUser } from "../dto";
import { IUserRepository } from "../model/user-repository-interface";

export class CreateUserUsecase {
  private readonly userRepository: IUserRepository;
  private readonly bCryptAdapter: IBCryptRepository;

  private constructor(
    userRepository: IUserRepository,
    bCryptAdapter: IBCryptRepository
  ) {
    this.userRepository = userRepository;
    this.bCryptAdapter = bCryptAdapter;
  }

  public static getInstance(
    userRepository: IUserRepository,
    bCryptAdapter: IBCryptRepository
  ): CreateUserUsecase {
    return new CreateUserUsecase(userRepository, bCryptAdapter);
  }

  public async execute(data: IUser): Promise<CreateUserResponseDTO> {
    const hashedPassword = await this.bCryptAdapter.create(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
