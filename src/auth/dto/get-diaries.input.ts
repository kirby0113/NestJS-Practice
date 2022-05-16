import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class GetDiariesInput {
  @Field()
  tag_id?: number;
  @Field()
  order_asc?: boolean;
}
