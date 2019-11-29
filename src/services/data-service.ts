import { UserLoginDto, UserRegisterDto, UserLogoutDto } from "./DTO/userDTO";
import { UpdateDataDto, DeleteDataDto, AddDataDto } from "./DTO/dataDTO";

export class DataService {
  public async add(dto: AddDataDto) {
    //add data to account
  }

  public async update(dto: UpdateDataDto) {
    //update data
  }

  public async delete(dto: DeleteDataDto) {
    //delete data
  }
}
