import {Offer} from '../models/offer';
import ipfsFileService, {IpfsFileService} from '../ipfs/ipfs-file-service';
import {Entries, Entry} from '../ipfs/ipfsModels';
import {HashUtils} from '../shared/HashUtils';


class OfferService {

    getOffers() {
        return ipfsFileService.getElementsFromDir(`${IpfsFileService.OFFERS_DIR}/`)
            .then((offers: Entries) => {
                console.log(res);
                //const paths
            })
    }

    addOffer(offer: Offer) {
        return ipfsFileService.getElementsFromDir()
            .then((offersDirFiles: Entries) => {
                const hash = HashUtils.createSha256Hash(HashUtils.getRandomText());
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
