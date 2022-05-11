import { InputTag } from 'src/tags/models/tag.model';
export declare class UpdateDiaryInput {
    id: number;
    title: string;
    detail: string;
    tags: InputTag[];
}
