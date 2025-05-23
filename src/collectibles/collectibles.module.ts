import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Collectible,
  CollectibleSchema,
  TradingCardCollectibleSchema,
} from './schemas/collectibles.schema';
import { CollectiblesController } from './collectible.controller';
import { CollectiblesService } from './collectibles.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Collectible.name,
        useFactory: () => {
          const schema = CollectibleSchema;

          //   schema.discriminator('coin', CoinCollectibleSchema);
          //   schema.discriminator('comic', ComicCollectibleSchema);
          schema.discriminator('trading_card', TradingCardCollectibleSchema);

          return schema;
        },
      },
    ]),
  ],
  controllers: [CollectiblesController],
  providers: [CollectiblesService],
})
export class CollectiblesModule {}
