import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Goods {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
