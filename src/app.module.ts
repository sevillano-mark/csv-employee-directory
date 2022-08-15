import { CommunityModule } from './modules/community.module';
import { EmployeeModule } from './modules/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controllers/employee.controller';

@Module({
  imports: [
    CommunityModule,
    EmployeeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/csv-employee-directory'),
  ],
  controllers: [EmployeeController, AppController],
  providers: [AppService],
})
export class AppModule {}
