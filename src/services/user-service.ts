import {UserLoginDto, UserRegisterDto} from './DTO/userDTO';
import {createHash} from 'crypto';
import { UserLoginDto, UserRegisterDto, UserLogoutDto } from './DTO/userDTO';
import { createHash } from 'crypto';
import { ipfsApi } from '../config/api';
import * as request from 'request';
import ipfsFileService from '../ipfs/ipfs-file-service';
import { User } from '../models/user';
import { logger } from '../shared/logger';
// import {ipfsClient} from 'ipfs-http-client';
const ipfsClient = require('ipfs-http-client');

// const ipfs = require('ipfs');

export class UserService {
  private ipfs = ipfsClient('http://localhost:5001');

    public async register(dto: UserRegisterDto) {
        const randomText = this.getRandomText();
        dto.walletId = this.createSha256Hash(randomText);
        const user = {
            id: this.createSha256Hash(this.getRandomText()),
            role: 'patient',
            privateWalletId: this.createSha256Hash(this.getRandomText()),
            publicWalletId: this.createSha256Hash(this.getRandomText()),
            username: dto.username,
            password: dto.password,
        } as User;
        ipfsFileService.createUserDir(user.username)
            .on('response', res => {
                this.createUserDetails(user);
            })
            .on('error', err => {
                console.log(err);
            });
    }

    private createUserDetails(user) {
        ipfsFileService.addFile(`/users/${user.username}`, 'userdetails', user)
            .on('response', resUserDetails => {
                var body = '';
                resUserDetails.on('data', function(chunk) {
                    body += chunk;
                });
                resUserDetails.on('end', function() {
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
    return ipfsFileService.getElementsFromDir('users').on('response', res => {
      let body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
    });
  }

}

const userService = new UserService();
export default userService;
