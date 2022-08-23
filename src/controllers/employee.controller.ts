import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { EmployeeCreateDto } from "src/dto/employee-create.dto";
import { EmployeeSearchQuery } from "src/dto/employee-query-search-dto";
import { QueryPagination } from "src/dto/query-pagination.dto";
import { Pagination } from "src/models/pagination.model";
import { EmpSearchQueryParamsPipe } from "src/pipes/empsearch.query.params.pipe";
import { QueryParamsPipe } from "src/pipes/query.params.pipe";
import { CommunityService } from "src/services/community.service";
import { EmployeeService } from "src/services/employee.service";
import { CustomErrors } from "src/shared/errors/custom.errors";
import { MessageConstants } from "src/shared/message.constants";

@ApiTags("Employee")
@Controller({ path: "employee" })
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private communityService: CommunityService
  ) {}

  @Get()
  @ApiQuery({ type: QueryPagination })
  async getAllEmployees(@Query(new QueryParamsPipe()) params) {
    const employeeList = await this.employeeService.findAll(params);
    const paginatedResult: Pagination = {
      results: employeeList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return {
      ...paginatedResult,
      message: MessageConstants.results.SUCCESS.FIND_ALL,
    };
  }

  @Get(":id")
  async getEmployee(@Param("id") employeeId: number) {
    const employee = await this.employeeService.findOne(employeeId);
    if (employee) {
      return {
        ...employee,
        message: MessageConstants.results.SUCCESS.FIND,
      };
    } else throw new NotFoundException(CustomErrors.EmployeeNotFound);
  }

  @Post()
  async createEmployee(@Body() employeeCreateDto: EmployeeCreateDto) {
    try {
      const communityObjectId =
        await this.communityService.findOneWithSelection(
          employeeCreateDto.communityId,
          ["_id"]
        );
      if (!communityObjectId) {
        throw new BadRequestException(CustomErrors.CommunityNotFound);
      }
      const employeeCreated = await this.employeeService.create(
        employeeCreateDto,
        communityObjectId["_id"]
      );
      return {
        ...employeeCreated,
        message: MessageConstants.results.SUCCESS.CREATE,
      };
    } catch (e) {
      if (e.name !== "BadRequestException") {
        throw new BadRequestException(CustomErrors.EmployeeCreateFailed);
      } else if (e.name === "MongoServerError") {
        throw new BadRequestException(e.message);
      } else {
        return e;
      }
    }
  }

  @Put(":id")
  async updateEmployee(
    @Param("id") employeeId: number,
    @Body() employeeCreateDto: EmployeeCreateDto
  ) {
    try {
      const communityObjectId =
        await this.communityService.findOneWithSelection(
          employeeCreateDto.communityId,
          ["_id"]
        );
      if (!communityObjectId) {
        throw new BadRequestException(CustomErrors.CommunityNotFound);
      }
      const employeeUpdated = await this.employeeService.update(
        employeeId,
        employeeCreateDto,
        communityObjectId["_id"]
      );
      if (employeeUpdated) {
        return {
          ...employeeUpdated,
          message: MessageConstants.results.SUCCESS.UPDATE,
        };
      } else throw new BadRequestException(CustomErrors.EmployeeNotFound);
    } catch (e) {
      if (e.name !== "BadRequestException") {
        throw new BadRequestException(CustomErrors.EmployeeCreateFailed);
      } else if (e.name === "MongoServerError") {
        throw new BadRequestException(e.message);
      } else {
        return e;
      }
    }
  }

  @Delete(":id")
  async deleteEmployee(@Param("id") employeeId: number) {
    const employeeDeleted = await this.employeeService.delete(employeeId);
    if (employeeDeleted) {
      return {
        ...employeeDeleted,
        message: MessageConstants.results.SUCCESS.DELETE,
      };
    } else throw new BadRequestException(CustomErrors.EmployeeNotFound);
  }

  @Get("search/general")
  @ApiQuery({ type: EmployeeSearchQuery })
  async generalSearch(@Query(new EmpSearchQueryParamsPipe()) params) {
    try {
      if (params.email || params.community || params.name || params.hireYear) {
        const searchedEmployees = await this.employeeService.generalSearch(
          params
        );
        const paginatedResult: Pagination = {
          results: searchedEmployees,
          currentPage: params.page,
          pageSize: params.pageLimit,
        };
        return {
          ...paginatedResult,
          message: MessageConstants.results.SUCCESS.FIND_ALL,
        };
      }
      throw new BadRequestException(CustomErrors.EmployeeSearchEmptyParams);
    } catch (e) {
      if (e.name !== "BadRequestException") {
        throw new BadRequestException(CustomErrors.EmployeeSearchFailed);
      } else if (e.name === "MongoServerError") {
        throw new BadRequestException(e.message);
      } else {
        return e;
      }
    }
  }
}
