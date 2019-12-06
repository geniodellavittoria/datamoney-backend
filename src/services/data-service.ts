import { AddDataDto, DeleteDataDto, UpdateDataDto, GetDataDto } from './DTO/dataDTO';
import ipfsFileService, { IpfsFileService } from '../ipfs/ipfs-file-service';
import { Entries } from '../ipfs/ipfsModels';
import { Data } from '../models/data';
import { HashUtils } from '../shared/HashUtils';
import { logger } from '../shared/logger';
import { file } from 'find';

class DataService {

  public async add(dto: AddDataDto) {
    return ipfsFileService.getElementsFromDir(`users/${dto.accountId}`)
      .then((userDirElementsBody: string) => {
        const userDirElements = JSON.parse(userDirElementsBody) as Entries;
        const data = {
          ownerId: dto.accountId,
          data: dto.data,
          hash: HashUtils.createSha256Hash(HashUtils.getRandomText()),
        } as Data;
        if (!userDirElements.Entries.some(element => element.Name === IpfsFileService.USER_DATA_DIR)) {
          return ipfsFileService.createDir(`${dto.accountId}/data`)
            .then((res) => {
              return ipfsFileService.addFile(`/${IpfsFileService.USERS_DIR}/${dto.accountId}/${IpfsFileService.USER_DATA_DIR}`, 'userdetails', data);
            });
        } else {
          return ipfsFileService.addFile(`/${IpfsFileService.USERS_DIR}/${dto.accountId}/${IpfsFileService.USER_DATA_DIR}`, 'userdetails', data);
        }
      })
      .then((file) => {
        const hashResponses = file.split('\n');
        if (hashResponses.length > 1) {
          return ipfsFileService.copy(`/users/${dto.accountId}/data/`, JSON.parse(hashResponses[1]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async get(dto: GetDataDto) {
    const path = `users/${dto.accountId}/data/`;
    return ipfsFileService.getElementsFromDir(path)
      .then((userDataDirElementsBody: string) => {
        const userDirElements = JSON.parse(userDataDirElementsBody) as Entries;
        return userDirElements.Entries;
      })
      .then((entries) => {
        let filePromises: Promise<Data>[] = [];
        entries.forEach(entry => {
          filePromises.push(ipfsFileService.getFile(`${path}${entry.Hash}`))
        });
        Promise.all(filePromises);
      })
  }

  public async update(dto: UpdateDataDto) {
    //update data
  }

  public async delete(dto: DeleteDataDto) {
    //delete data
  }
}

const dataService = new DataService();
export default dataService;
