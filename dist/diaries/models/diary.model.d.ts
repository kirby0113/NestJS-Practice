import { Tag } from 'src/tags/models/tag.model';
export declare class Diary {
    id: number;
    title: string;
    detail: string;
    created_at: Date;
    tags: Tag[];
}
