import { CommunityService } from './../services/community.service';
import { CommunityController } from './../controllers/community.controller';
import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from 'src/models/community.schema';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { PaginationHelper } from 'src/helper/pagination.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Community', schema: CommunitySchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Community.name,
        useFactory: (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);

          const schema = CommunitySchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'communityId',
            start_seq: 0
          });

          return schema;
        },
        inject: [getConnectionToken()]
      },
    ]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService, PaginationHelper],
})
export class CommunityModule {}
