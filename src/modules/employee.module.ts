import { EmployeeController } from "../controllers/employee.controller";
import { EmployeeService } from "../services/employee.service";
import { Module } from "@nestjs/common";
import { EmployeeSchema } from "src/models/employee.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CommunitySchema } from "src/models/community.schema";
import { GeneralHelper } from "src/helper/general.helper";
import { PaginationHelper } from "src/helper/pagination.helper";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Employee", schema: EmployeeSchema }]),
    MongooseModule.forFeature([{ name: "Community", schema: CommunitySchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, GeneralHelper, PaginationHelper],
})
export class EmployeeModule {}
