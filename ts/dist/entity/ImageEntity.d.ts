import { DogEntityBase } from '../DogEntityBase';
import type { DogSDK } from '../DogSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch, ImageListMatch } from '../DogTypes';
declare class ImageEntity extends DogEntityBase<Image> {
    constructor(client: DogSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
}
export { ImageEntity };
