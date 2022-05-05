import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  message: string;
}
