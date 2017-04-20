export interface Header {
    header: string;
    value: string;
}
export declare class ImageService {
    postImage(url: string, image: File, headers?: Header[]): any;
}
