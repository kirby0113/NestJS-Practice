import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class GetDiariesInput {
  tag_id?: number;
  order_asc?: boolean;
}
