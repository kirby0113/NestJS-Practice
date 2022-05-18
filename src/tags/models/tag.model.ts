import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  user_id: number;
}

@InputType()
export class InputTag {
  @Field(() => ID)
  id: number;
  @Field()
  name?: string;
  @Field()
  user_id?: number;
}

@ObjectType()
export class CreateTag {
  @Field()
  name: string;
  @Field()
  user_id: number;
}
