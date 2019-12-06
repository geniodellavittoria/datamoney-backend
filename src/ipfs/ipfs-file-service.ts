import request from 'request';
import { ipfsApi } from '../config/api';
import * as rp from 'request-promise-native';
import { file, fileSync } from 'find';
import { Data } from 'src/models/data';
import { resolve } from 'dns';
import { rejects } from 'assert';

request.debug = true;

export class IpfsFileService {

  public static USERS_DIR = 'users';
  public static USER_DETAILS = 'userdetails';
  public static USER_DATA_DIR = 'data';
  /**
   * @param dir path (not hashes!)
   */
  public getElementsFromDir(dir = '') {
    let path = `${ipfsApi.files}/ls?`;
    if (dir !== '') {
      path = `${path}arg=/${dir}&`;
    }
    path = `${path}l=true&U=true`;
    return rp.get(path);
  }

  public addFile(path: string, filename: string, data: any) {
    let url = `${ipfsApi.add}?pin=false&wrapWithDirectory=false&progress=true&wrap-with-directory=false&stream-channels=true`;
    return rp.post({
      url,
      formData: { data: JSON.stringify(data) },
    });
  }

  public createDir(folderPath: string) {
    let path = `${ipfsApi.files}/mkdir?arg=/users/${folderPath}`;
    return rp.get(path);
  }

  public getFile(pathToResource: string = '') {
    const path = `${ipfsApi.files}/read?arg=/${pathToResource}`;
    return rp.get(path).then((dataString) => {
      const data = dataString as Data;
      console.log(data);
      return new Promise<Data>(
        (resolve, reject) => {
          resolve(data);
        })
    });
  }

  public getFiles(paths: string[] = ['']) {
    const files = [];
    paths.forEach((pathToResource) => {
      this.getFile(pathToResource)
        .then((file) => {
          files.push(file);
        });
    });
  }

  // needed to display file on ipfs UI
  public copy(dir: string, hashResponse: any) {
    let path = `${ipfsApi.files}/cp?arg=/ipfs/${hashResponse.Hash}&arg=${dir}&stream-channels=true`;
    return rp.post(path);
  }
}

const ipfsFileService = new IpfsFileService();

export default ipfsFileService;
