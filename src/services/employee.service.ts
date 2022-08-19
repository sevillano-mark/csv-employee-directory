import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "src/models/employee.schema";
import { EmployeeCreateDto } from "src/dto/employee-create.dto";
import { Community, CommunityDocument } from "src/models/community.schema";
import { CustomErrors } from "src/shared/errors/custom.errors";
import { globalConfig } from "src/shared/config/global.config";
import { GeneralHelper } from "src/helper/general.helper";
import { QueryPagination } from "src/dto/query-pagination.dto";
import { PaginationHelper } from "src/helper/pagination.helper";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
    private generalHelper: GeneralHelper,
    private paginationHelper: PaginationHelper
  ) {}

  async create(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
    const communityObjId = await this.communityModel
      .findOne({ communityId: employeeCreateDto.communityId })
      .select(["_id"]);
    if (!communityObjId) {
      throw new BadRequestException(CustomErrors.CommunityNotFound);
    }
    console.log(employeeCreateDto);
    try {
      const employee = new this.employeeModel(
        this.generalHelper.createEmployeeFromDto(
          employeeCreateDto,
          communityObjId
        )
      );
      return (await employee.save()) ? employee.toObject() : null;
    } catch (e) {
      if (e.name === "MongoServerError") {
        throw new BadRequestException(e.message);
      } else {
        throw new InternalServerErrorException(
          CustomErrors.EmployeeCreateFailed,
          e
        );
      }
    }
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
    employeeCreateDto: EmployeeCreateDto
  ): Promise<Employee> {
    const condition = { employeeNumber: empId, deleted: false };
    const communityObjId = await this.communityModel
      .findOne({ communityId: employeeCreateDto.communityId })
      .select("_id");
    if (!communityObjId) {
      throw new BadRequestException(CustomErrors.CommunityNotFound);
    }
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

  async findByYear(params: QueryPagination, year: number): Promise<Employee[]> {
    const start = new Date(year, 1, 1);
    const end = new Date(year, 12, 31);
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
      { hireDate: { $gte: start, $lt: end }, deleted: false },
      populate
    );
    return await paginatedQuery.exec();
  }

  async findByName(params: QueryPagination, term: string): Promise<Employee[]> {
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
      { $text: { $search: term }, deleted: false },
      populate
    );
    return await paginatedQuery.exec();
  }

  async findByEmail(email: string): Promise<Employee> {
    return await this.employeeModel
      .findOne({ email: email, deleted: false })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT)
      .populate({
        path: "community",
        model: this.communityModel,
        select: globalConfig.fields.SHOW_FIELDS_COMMUNITY_SUB,
      });
  }

  async findByCommunity(
    params: QueryPagination,
    communityId: number
  ): Promise<Employee[]> {
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
      {
        community: await this.communityModel.findOne({ communityId }),
        deleted: false,
      },
      populate
    );
    return await paginatedQuery.exec();
  }
}
