import {UserLoginDto, UserRegisterDto, UserLogoutDto} from './DTO/userDTO';
import {createHash} from 'crypto';
import {ipfsApi} from '../config/api';
import * as request from 'request';
import ipfsFileService from '../ipfs/ipfs-file-service';
import {User} from '../models/user';
// import {ipfsClient} from 'ipfs-http-client';
const ipfsClient = require('ipfs-http-client');

// const ipfs = require('ipfs');

export class UserService {
    private ipfs = ipfsClient('http://localhost:5001');

    public async register(dto: UserRegisterDto) {
        const randomText = this.getRandomText();
        dto.walletId = this.createSha256Hash(randomText);
        // const results = await this.ipfs.add(Buffer.from(JSON.stringify(dto)));
        // const hash = results[0].hash;
        // console.log(hash);
        const user = {
            id: this.createSha256Hash(this.getRandomText()),
            role: 'patient',
            privateWalletId: this.createSha256Hash(this.getRandomText()),
            publicWalletId: this.createSha256Hash(this.getRandomText()),
            username: dto.username,
            password: dto.password,
        } as User;
        // let resp;
        ipfsFileService.createUserDir(user.username)
            .on('response', res => {
                ipfsFileService.addFile(`/users/${user.username}`, 'userdetails', user)
                    .on('response', resUserDetails => {
                        var body = '';
                        resUserDetails.on('data', function (chunk) {
                            body += chunk;
                        });
                        resUserDetails.on('end', function () {
                            const hashResponses = body.split('\n');
                            if (hashResponses.length > 1) {
                                ipfsFileService.copy(`/users/${user.username}/userdetails`, JSON.parse(hashResponses[1]))
                                    .on('response', res => {
                                        console.log(res);
                                    })
                                    .on('error', err => {
                                        console.log(err);
                                    });
                            }
                        });
                    })
                    .on('error', err => {
                        console.log(err);
                    });
            })
            .on('error', err => {
                console.log(err);
            });
        // .pipe(resp);
        // console.log(resp);
        // const res = await this.ipfs.add({path: 'testfile', content: Buffer.from(JSON.stringify(dto))});
        // console.log(res[0]);
        // .then((res: any) => {
        //     const hash = res[0].hash;
        //     console.log('added data hash:', hash);
        //     return this.ipfs.files.cat(hash);
        // })
        // .then((output: any) => {
        //     console.log('retrieved data:', JSON.parse(output));
        // });
        // request.post(ipfsApi.add);

        //register user
        // return dto;
    }

    private createSha256Hash(randomText) {
        return createHash('sha256').update(randomText).digest('hex');
    }

    private getRandomText() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

const userService = new UserService();
export default userService;
