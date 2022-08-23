import { CommunityService } from "src/services/community.service";
import { CommunityController } from "src/controllers/community.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommunitySchema } from "src/models/community.schema";
import { PaginationHelper } from "src/helper/pagination.helper";
import { GeneralHelper } from "src/helper/general.helper";
import { EmployeeSchema } from "src/models/employee.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Employee", schema: EmployeeSchema }]),
    MongooseModule.forFeature([{ name: "Community", schema: CommunitySchema }]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService, GeneralHelper, PaginationHelper],
})
export class CommunityModule {}
