import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tag } from 'src/tags/models/tag.model';

@ObjectType()
export class Diary {
  @Field(() => ID)
  id: number;
  title: string;
  detail: string;
  created_at: Date;
  tags: Tag[];
}
