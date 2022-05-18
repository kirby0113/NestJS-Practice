import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetDiariesInput {
  @Field({ nullable: true })
  tag_id: number;
  @Field({ nullable: true })
  order_asc: boolean;
}
