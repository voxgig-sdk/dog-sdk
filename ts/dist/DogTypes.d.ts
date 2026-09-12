export interface Breed {
    id?: string;
    message?: any[];
    status?: string;
}
export interface BreedLoadMatch {
    id: string;
    message?: any[];
    status?: string;
}
export interface BreedListMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface Image {
    message?: any[];
    status?: string;
}
export interface ImageLoadMatch {
    breed_id?: string;
    count: number;
    $action?: string;
    [action: string]: any;
}
export interface ImageListMatch {
    breed_id: string;
    sub_breed?: string;
}
