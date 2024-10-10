import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Goods } from './entities/goods.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class ExampleResolver {
  private pubSub: PubSub;

  constructor(private readonly prisma: PrismaService) {
    this.pubSub = new PubSub();
  }

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @Query(() => [Goods])
  async getAllGoods() {
    const goods = await this.prisma.goods.findMany();

    return goods;
  }

  @Mutation(() => Goods)
  async createGoods(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
  ) {
    const newGoods = await this.prisma.goods.create({
      data: {
        name,
        description,
        price,
      },
    });

    // Публикация события обновления товара
    this.pubSub.publish('goodsUpdated', { goodsUpdated: newGoods });

    return newGoods;
  }

  @Subscription(() => Goods, {
    resolve: (payload) => payload.goodsUpdated, // Убедитесь, что возвращается не null
  })
  goodsUpdated() {
    return this.pubSub.asyncIterator('goodsUpdated');
  }
}
