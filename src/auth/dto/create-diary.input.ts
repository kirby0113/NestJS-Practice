import { Field, ID, InputType } from '@nestjs/graphql';
import { InputTag } from '../../tags/models/tag.model';

@InputType()
export class CreateDiaryInput {
  @Field(() => ID)
  title: string;
  @Field()
  detail: string;
  @Field(() => [InputTag])
  tags: InputTag[];
}
