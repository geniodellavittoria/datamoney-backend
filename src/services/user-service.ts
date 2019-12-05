import {UserLoginDto, UserRegisterDto} from './DTO/userDTO';
import {createHash} from 'crypto';
import ipfsFileService from '../ipfs/ipfs-file-service';
import {User} from '../models/user';

const ipfsClient = require('ipfs-http-client');


export class UserService {
    private ipfs = ipfsClient('http://localhost:5001');

    public async register(dto: UserRegisterDto) {
        return ipfsFileService.createUserDir(dto.username)
            .then((res) => {
                const user = userService.createUser(dto);
                return userService.createUserDetails(user);
            });
    }

    public createUser(dto: UserRegisterDto) {
        const randomText = this.getRandomText();
        dto.walletId = this.createSha256Hash(randomText);
        return {
            id: this.createSha256Hash(this.getRandomText()),
            role: 'patient',
            privateWalletId: this.createSha256Hash(this.getRandomText()),
            publicWalletId: this.createSha256Hash(this.getRandomText()),
            username: dto.username,
            password: dto.password,
        } as User;
    }

    public createUserDetails(user: User) {
        return ipfsFileService.addFile(`/users/${user.username}`, 'userdetails', user)
            .then((userDetails) => {
                const hashResponses = userDetails.split('\n');
                if (hashResponses.length > 1) {
                    return ipfsFileService.copy(`/users/${user.username}/userdetails`, JSON.parse(hashResponses[1]));
                }
            });
    }

    private createSha256Hash(randomText: string) {
        return createHash('sha256').update(randomText).digest('hex');
    }

    private getRandomText() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }

    public async login(dto: UserLoginDto) {
        return ipfsFileService.getElementsFromDir('users').on('response', (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                console.log(body);
            });
        });
    }

}

const userService = new UserService();
export default userService;
