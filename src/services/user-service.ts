import {UserLoginDto, UserRegisterDto} from './DTO/userDTO';
import ipfsFileService, {IpfsFileService} from '../ipfs/ipfs-file-service';
import {User} from '../models/user';
import {Entries, Entry} from '../ipfs/ipfsModels';
import {HashUtils} from '../shared/HashUtils';


class UserService {

    public async register(dto: UserRegisterDto) {
        return ipfsFileService.createDir(`/${IpfsFileService.USERS_DIR}/${dto.username}`)
            .then((res) => {
                const user = userService.createUser(dto);
                return userService.createUserDetails(user);
            });
    }

    public createUser(dto: UserRegisterDto) {
        dto.walletId = HashUtils.createSha256Hash(HashUtils.getRandomText());
        return {
            id: HashUtils.createSha256Hash(HashUtils.getRandomText()),
            role: dto.role,
            privateWalletId: HashUtils.createSha256Hash(HashUtils.getRandomText()),
            publicWalletId: HashUtils.createSha256Hash(HashUtils.getRandomText()),
            username: dto.username,
            password: dto.password,
        } as User;
    }

    public createUserDetails(user: User) {
        return ipfsFileService.addFile(`/${IpfsFileService.USERS_DIR}/${user.username}`, IpfsFileService.USER_DETAILS, user)
            .then((userDetails) => {
                const hashResponses = userDetails.split('\n');
                if (hashResponses.length > 1) {
                    return ipfsFileService.copy(`/users/${user.username}/userdetails`, JSON.parse(hashResponses[1]));
                }
            });
    }

    public async login(dto: UserLoginDto) {
        return ipfsFileService.getElementsFromDir(`users/${dto.username}`)
            .then((userDirElements: Entries) => {
                console.log(userDirElements);
                if (userDirElements != null) {
                    const userDetails = userDirElements.Entries.filter((entry: Entry) => entry.Name === IpfsFileService.USER_DETAILS);
                    if (userDetails != null && userDetails.length > 0) {
                        return ipfsFileService.getFile<User>(`${IpfsFileService.USERS_DIR}/${dto.username}/${IpfsFileService.USER_DETAILS}`);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

const userService = new UserService();
export default userService;
