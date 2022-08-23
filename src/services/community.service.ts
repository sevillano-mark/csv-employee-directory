import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CommunityCreateDto } from "src/dto/community-create.dto";
import { PaginationHelper } from "src/helper/pagination.helper";
import { Community, CommunityDocument } from "src/models/community.schema";
import { QueryPagination } from "src/dto/query-pagination.dto";
import { globalConfig } from "src/shared/config/global.config";
import { Employee, EmployeeDocument } from "src/models/employee.schema";

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private paginationHelper: PaginationHelper
  ) {}

  async create(communityCreateDto: CommunityCreateDto): Promise<Community> {
    const community = new this.communityModel(communityCreateDto);
    return (await community.save()) ? await community.toObject() : null;
  }

  async findAll(params: QueryPagination): Promise<Community[]> {
    await this.paginationHelper.queryPaginationValidate(params);
    const populate = {
      parent: globalConfig.fields.HIDE_FLDS_IN_RESULT,
    };
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.communityModel,
      params,
      { deleted: false },
      populate
    );
    return await paginatedQuery.exec();
  }

  async findOne(communityId: number): Promise<Community> {
    const community = await this.communityModel
      .findOne({
        communityId: communityId,
        deleted: false,
      })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT);
    return community ? await community.toObject() : null;
  }

  async update(
    communityId: number,
    community: CommunityCreateDto
  ): Promise<Community> {
    const condition = { communityId: communityId, deleted: false };
    const commToBeUpdated = await this.communityModel
      .findOneAndUpdate(condition, community, {
        new: true,
      })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT);
    return commToBeUpdated ? await commToBeUpdated.toObject() : null;
  }

  async delete(communityId: number): Promise<any> {
    const condition = { communityId: communityId };
    const commToBeDeleted = await this.communityModel.findOneAndUpdate(
      condition,
      { deleted: true },
      { new: true }
    );
    return commToBeDeleted ? await commToBeDeleted.toObject() : null;
  }

  async findByName(
    params: QueryPagination,
    term: string
  ): Promise<Community[]> {
    const populate = {
      parent: globalConfig.fields.HIDE_FLDS_IN_RESULT,
    };
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.communityModel,
      params,
      { $text: { $search: term }, deleted: false },
      populate
    );
    return await paginatedQuery.exec();
  }

  async countUsersOnCommunity(communityObjId: ObjectId): Promise<number> {
    const employeeCount = await this.employeeModel.countDocuments({
      deleted: false,
      community: communityObjId,
    });
    return employeeCount;
  }

  async findOneWithSelection(
    communityId: number,
    selection: any = []
  ): Promise<Community> {
    const community = await this.communityModel
      .findOne({
        communityId: communityId,
        deleted: false,
      })
      .select(selection);
    return community ? await community.toObject() : null;
  }

  async searchByName(term: string) {
    const searchResults = await this.communityModel
      .find({
        name: { $regex: new RegExp([".*", term, ".*"].join(""), "i") },
      })
      .select("_id");
    return searchResults;
  }
}
