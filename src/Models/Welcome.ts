export class RegisterModel {
  public email?: string;
  public password?: string;
  public confirm?: string;

  public constructor(email?: string, password?: string, confirm?: string) {
    this.email = email;
    this.password = password;
    this.confirm = confirm;
  }
}

export class LoginModel {
  public email?: string;
  public password?: string;

  public constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class CredentialsModel {
  public email?: string;
  public password?: string;

  public constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserModel {
  public token: string;
  public email: string;

  public constructor(token?: string, email?: string) {
    this.token = token || '';
    this.email = email || '';
  }
}

export class UsersModel{
    public id: number;
    public email: string;
    public password: string;
    public type: string;

    public constructor(id: number, email: string, password: string, type: string) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.type = type;
    }
  }
