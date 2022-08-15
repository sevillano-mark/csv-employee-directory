/* eslint-disable prettier/prettier */
import { CommunityController } from './../controllers/community.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    CommunityController,],
  providers: [],
})
export class CommunityModule { }
