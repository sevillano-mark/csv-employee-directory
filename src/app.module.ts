import { CommunityModule } from './modules/community.module';
import { EmployeeModule } from './modules/employee.module';
import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controllers/employee.controller';
import { CommunityService } from './services/community.service';
import { EmployeeService } from './services/employee.service';
import { Connection } from 'mongoose';
import { Community, CommunitySchema } from './models/community.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { MongoService } from './services/mongodb.service';
import { PaginationHelper } from './helper/pagination.helper';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CommunityModule,
    EmployeeModule,
    MongooseModule.forRootAsync({
      useClass: MongoService,
    })
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
