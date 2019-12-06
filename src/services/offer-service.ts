import {Offer} from '../models/offer';
import ipfsFileService, {IpfsFileService} from '../ipfs/ipfs-file-service';
import {Entries, Entry} from '../ipfs/ipfsModels';
import {HashUtils} from '../shared/HashUtils';
import {Data} from '../models/data';


class OfferService {

    getOffers() {
        return ipfsFileService.getElementsFromDir(`${IpfsFileService.OFFERS_DIR}/`)
            .then((offers: Entries) => {
                console.log(offers);
                const filePromises: Array<Promise<Data>> = [];
                offers.Entries.forEach((entry: Entry) => {
                    filePromises.push(ipfsFileService.getFile<Data>(`${IpfsFileService.OFFERS_DIR}/${entry.Hash}`));
                });
                return Promise.all(filePromises);
            });
    }

    addOffer(offer: Offer) {
        return ipfsFileService.getElementsFromDir()
            .then((offersDirFiles: Entries) => {
                const hash = HashUtils.createSha256Hash(HashUtils.getRandomText());
                offer.id = hash;
                if (!offersDirFiles.Entries.some((entry: Entry) => entry.Name === IpfsFileService.OFFERS_DIR)) {
                    return ipfsFileService.createDir(`/${IpfsFileService.OFFERS_DIR}`)
                        .then((res) => {
                            ipfsFileService.addFileAndCopy(`${IpfsFileService.OFFERS_DIR}/`, hash, offer);
                        });
                }
                // console.log(offersDirFiles);
                return ipfsFileService.addFileAndCopy(`${IpfsFileService.OFFERS_DIR}/`, hash, offer);
            });
        // ipfsFileService.createDir(`${IpfsFileService.OFFERS_DIR}`);
    }
}

const offerService = new OfferService();
export default offerService;
