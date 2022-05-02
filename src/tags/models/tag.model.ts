import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;
  name: string;
  user_id: number;
}

@ObjectType()
export class CreateTag {
  name: string;
  user_id: number;
}
