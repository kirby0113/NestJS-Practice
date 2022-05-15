import { Field, ID, InputType } from '@nestjs/graphql';
import { InputTag } from '../../tags/models/tag.model';

@InputType()
export class UpdateDiaryInput {
  id: number;
  title: string;
  detail: string;
  @Field(() => [InputTag])
  tags: InputTag[];
}
