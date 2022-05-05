import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { InputTag } from 'src/tags/models/tag.model';

@InputType()
export class CreateDiaryInput {
  @Field(() => ID)
  title: string;
  detail: string;
  @Field(() => [InputTag])
  tags: InputTag[];
}