import { bCryptAdapterFactory } from "../../../infra/bcrypt/factory";
import { userRepositoryFactory } from "../repository/user-repository-factory";
import { CreateUserUsecase } from "../usecase/create-user-usecase";

export function createUserUsecaseFactory(): CreateUserUsecase {
  return CreateUserUsecase.getInstance(
    userRepositoryFactory(),
    bCryptAdapterFactory()
  );
}
