export interface IRegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export class RegisterError {
  code: string;
  description: string;
}

export class RegisterResponse {
  succeeded: boolean;
  errors: RegisterError[];
}
