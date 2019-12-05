import request from 'request';
import {ipfsApi} from '../config/api';
import * as rp from 'request-promise-native';

request.debug = true;

class IpfsFileService {
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

  public createUserDir(userId: string) {
    let path = `${ipfsApi.files}/mkdir?arg=/users/${userId}`;
    return rp.get(path);
  }

  public getFile(hash: string) {
    const path = `${ipfsApi}/ipfs/${hash}`;
    return rp.get(path);
  }

  public copy(dir: string, hashResponse: any) {
    let path = `${ipfsApi.files}/cp?arg=/ipfs/${hashResponse.Hash}&arg=${dir}&stream-channels=true`;
    return rp.post(path);
  }
}

const ipfsFileService = new IpfsFileService();

export default ipfsFileService;
