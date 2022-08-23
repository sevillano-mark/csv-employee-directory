import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Employee, EmployeeDocument } from "src/models/employee.schema";
import { EmployeeCreateDto } from "src/dto/employee-create.dto";
import { Community, CommunityDocument } from "src/models/community.schema";
import { globalConfig } from "src/shared/config/global.config";
import { GeneralHelper } from "src/helper/general.helper";
import { QueryPagination } from "src/dto/query-pagination.dto";
import { PaginationHelper } from "src/helper/pagination.helper";
import { EmployeeSearchQuery } from "src/dto/employee-query-search-dto";
import { SearchHelper } from "src/helper/search.helper";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
    private generalHelper: GeneralHelper,
    private paginationHelper: PaginationHelper,
    private searchHelper: SearchHelper
  ) {}

  async create(
    employeeCreateDto: EmployeeCreateDto,
    communityObjId: ObjectId
  ): Promise<Employee> {
    const employee = new this.employeeModel(
      this.generalHelper.createEmployeeFromDto(
        employeeCreateDto,
        communityObjId
      )
    );
    return (await employee.save()) ? employee.toObject() : null;
  }

  async findAll(params: QueryPagination): Promise<Employee[]> {
    await this.paginationHelper.queryPaginationValidate(params);
    const populate = {
      parent: globalConfig.fields.HIDE_FLDS_IN_RESULT,
      sub: [
        {
          path: "community",
          model: this.communityModel,
          select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
        },
      ],
    };
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.employeeModel,
      params,
      { deleted: false },
      populate
    );
    return await paginatedQuery.exec();
  }

  async findOne(empId: number): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({ employeeNumber: empId, deleted: false })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT)
      .populate({
        path: "community",
        model: this.communityModel,
        select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
      });
    return employee ? await employee.toObject() : null;
  }

  async update(
    empId: number,
    employeeCreateDto: EmployeeCreateDto,
    communityObjId: ObjectId
  ): Promise<Employee> {
    const condition = { employeeNumber: empId, deleted: false };
    const empToBeUpdated = await this.employeeModel
      .findOneAndUpdate(
        condition,
        this.generalHelper.createEmployeeFromDto(
          employeeCreateDto,
          communityObjId
        ),
        { new: true }
      )
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT)
      .populate({
        path: "community",
        model: this.communityModel,
        select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
      });
    return empToBeUpdated ? await empToBeUpdated.toObject() : null;
  }

  async delete(empId: number): Promise<any> {
    const condition = { employeeNumber: empId, deleted: false };
    const empToBeDeleted = await this.employeeModel
      .findOneAndUpdate(condition, { deleted: true }, { new: true })
      .populate({
        path: "community",
        model: this.communityModel,
        select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
      });
    return empToBeDeleted ? await empToBeDeleted.toObject() : null;
  }

  async generalSearch(params: EmployeeSearchQuery): Promise<Employee[]> {
    await this.paginationHelper.queryPaginationValidate(params);
    const populate = {
      parent: globalConfig.fields.HIDE_FLDS_IN_RESULT,
      sub: [
        {
          path: "community",
          model: this.communityModel,
          select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
        },
      ],
    };

    const searchQuery = await this.searchHelper.generateSearchQuery(params);
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.employeeModel,
      params,
      searchQuery,
      populate
    );
    return await paginatedQuery.exec();
  }

  async findOneWithSelection(
    employeeId: number,
    selection: any = []
  ): Promise<Community> {
    const employee = await this.employeeModel
      .findOne({
        communityId: employeeId,
        deleted: false,
      })
      .select(selection);
    return employee ? await employee.toObject() : null;
  }
}
