export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserRegisterDto {
  username: string;
  password: string;
  walletId: string;
}

export interface UserLogoutDto {
  id: string;
}
