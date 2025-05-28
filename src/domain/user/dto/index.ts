export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  id: string;
  email: string;
  name: string;
}

export interface UserConstructorDTO extends IUser {
  id: string;
}
