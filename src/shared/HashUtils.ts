import {createHash} from 'crypto';

export class HashUtils {

    public static createSha256Hash(randomText: string) {
        return createHash('sha256').update(randomText).digest('hex');
    }

    public static getRandomText() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }
}
