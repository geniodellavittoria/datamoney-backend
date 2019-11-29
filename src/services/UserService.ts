import { UserLoginDto, UserRegisterDto, UserLogoutDto } from "./DTO/UserDTO";

export class UserService {
  public async register(dto: UserRegisterDto) {
    //register user
    return dto;
  }

  public async login(dto: UserLoginDto) {
    //login user
    return dto;
  }

  public async logout(dto: UserLogoutDto) {
    //logout user
    return dto;
  }
}
