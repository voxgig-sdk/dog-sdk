import { DogEntityBase } from '../DogEntityBase';
import type { DogSDK } from '../DogSDK';
import type { Control } from '../types';
import type { Breed, BreedLoadMatch, BreedListMatch } from '../DogTypes';
declare class BreedEntity extends DogEntityBase<Breed> {
    constructor(client: DogSDK, entopts: any);
    make(this: BreedEntity): BreedEntity;
    load(this: any, reqmatch?: BreedLoadMatch, ctrl?: Control): Promise<BreedEntity>;
    list(this: any, reqmatch?: BreedListMatch, ctrl?: Control): Promise<BreedEntity[]>;
}
export { BreedEntity };
