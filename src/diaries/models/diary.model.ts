import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tag } from '../../tags/models/tag.model';

@ObjectType()
export class Diary {
  @Field(() => ID)
  id: number;
  @Field()
  title: string;
  @Field()
  detail: string;
  @Field()
  created_at: Date;
  @Field(() => [Tag])
  tags: Tag[];
}
