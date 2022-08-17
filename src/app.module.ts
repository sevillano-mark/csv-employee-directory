import { CommunityModule } from './modules/community.module';
import { EmployeeModule } from './modules/employee.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './services/mongodb.service';

@Module({
  imports: [
    CommunityModule,
    EmployeeModule,
    MongooseModule.forRootAsync({
      useClass: MongoService,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
