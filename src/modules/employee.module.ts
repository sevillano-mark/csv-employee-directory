import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.service';

import { Module } from '@nestjs/common';
import { EmployeeSchema } from 'src/models/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
