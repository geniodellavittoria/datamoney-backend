export interface UserLoginDto {
  email: string;
  pw: string;
}

export interface UserRegisterDto {
  email: string;
  pw: string;
  walletId: string;
}

export interface UserLogoutDto {
  id: string;
}
