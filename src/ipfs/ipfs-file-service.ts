import request from 'request';
import {ipfsApi} from '../config/api';
import * as rp from 'request-promise-native';
import {Entries} from './ipfsModels';

request.debug = true;

export class IpfsFileService {

  public static USERS_DIR = 'users';
  public static USER_DETAILS = 'userdetails';
  public static USER_DATA_DIR = 'data';
  public static OFFERS_DIR = 'offers';

  /**
   * @param dir path (not hashes!)
   */
  public getElementsFromDir(dir = '') {
    let path = `${ipfsApi.files}/ls?`;
    if (dir !== '') {
      path = `${path}arg=/${dir}&`;
    } else {
      path = `${path}arg=/&`;
    }
    path = `${path}l=true&U=true`;
    return rp.get(path)
        .then((dirs: string) => {
          const data = JSON.parse(dirs) as Entries;
          return new Promise<Entries>(
              (resolve, reject) => {
                resolve(data);
              });
        });
  }

  public addFileAndCopy(path: string, filename: string, data: any) {
    return this.addFile(path, filename, data)
      .then((file) => {
        const hashResponses = file.split('\n');
        if (hashResponses.length > 1) {
          return ipfsFileService.copy(path, JSON.parse(hashResponses[1]));
        }
        throw Error('Could not add file to ipfs');
      });
  }

  public addFile(path: string, filename: string, data: any) {
    let url = `${ipfsApi.add}?pin=false&wrapWithDirectory=false&progress=true&wrap-with-directory=false&stream-channels=true`;
    return rp.post({
      url,
      formData: { data: JSON.stringify(data) },
    });
  }

  public createDir(folderPath: string) {
    let path = `${ipfsApi.files}/mkdir?arg=${folderPath}`;
    return rp.get(path);
  }

  public getFile<T>(pathToResource: string = ''): Promise<T> {
    const path = `${ipfsApi.files}/read?arg=/${pathToResource}`;
    return rp.get(path).then((dataString) => {
      const data = JSON.parse(dataString) as T;
      return new Promise<T>(
        (resolve, reject) => {
          resolve(data);
        });
    });
  }

  // needed to display file on ipfs UI
  public copy(dir: string, hashResponse: any) {
    let path = `${ipfsApi.files}/cp?arg=/ipfs/${hashResponse.Hash}&arg=/${dir}&stream-channels=true`;
    return rp.post(path);
  }
}

const ipfsFileService = new IpfsFileService();

export default ipfsFileService;
