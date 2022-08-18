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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeCreateDto } from 'src/dto/employee-create.dto';
import { Pagination } from 'src/models/pagination.model';
import { QueryParamsPipe } from 'src/pipes/query.params.pipe';
import { EmployeeService } from 'src/services/employee.service';
import { CustomErrors } from 'src/shared/errors/custom.errors';

@ApiTags('Employee')
@Controller({ path: 'employee' })
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(@Query(new QueryParamsPipe()) params) {
    const employeeList = await this.employeeService.findAll(params);
    const paginatedResult: Pagination = {
      results: employeeList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return paginatedResult;
  }

  @Get(':id')
  async getEmployee(@Param('id') employeeId: number) {
    const employee = await this.employeeService.findOne(employeeId);
    if (employee) return employee;
    else throw new NotFoundException(CustomErrors.EmployeeNotFound);
  }

  @Post()
  async createEmployee(@Body() employeeCreateDto: EmployeeCreateDto) {
    const employeeCreated = await this.employeeService.create(
      employeeCreateDto,
    );
    return employeeCreated;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') employeeId: number,
    @Body() employeeCreateDto: EmployeeCreateDto,
  ) {
    const employeeUpdated = await this.employeeService.update(
      employeeId,
      employeeCreateDto,
    );
    if (employeeUpdated) return employeeUpdated;
    else throw new BadRequestException(CustomErrors.EmployeeNotFound);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') employeeId: number) {
    const employeeDeleted = await this.employeeService.delete(employeeId);
    if (employeeDeleted) return employeeDeleted;
    else throw new BadRequestException(CustomErrors.EmployeeNotFound);
  }
  @Get('search/year-hired/:year')
  async getByYearHired(@Query(new QueryParamsPipe()) params, @Param('year') year: number) {
    const employeeList = await this.employeeService.findByYear(params, year)
    const paginatedResult: Pagination = {
      results: employeeList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return paginatedResult;
  }

  @Get('search/name/:term')
  async searchByName(@Query(new QueryParamsPipe()) params, @Param('term') term: string) {
    const employeeList = await this.employeeService.findByName(params, term)
    const paginatedResult: Pagination = {
      results: employeeList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return paginatedResult;
  }
}
