import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityCreateDto } from 'src/dto/community-create.dto';
import { PaginationHelper } from 'src/helper/pagination.helper';
import { Community, CommunityDocument } from 'src/models/community.schema';
import { QueryPagination } from 'src/dto/query-pagination.dto';
import { globalConfig } from 'src/shared/config/global.config';
import { CustomErrors } from 'src/shared/errors/custom.errors';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
    private paginationHelper: PaginationHelper,
  ) {}

  async create(communityCreateDto: CommunityCreateDto): Promise<Community> {
    try {
      const community = new this.communityModel(communityCreateDto);
      return community.save();
    } catch (e) {
      throw new InternalServerErrorException(
        CustomErrors.CommunityCreateFailed,
        e,
      );
    }
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
      populate,
    );
    return await paginatedQuery.exec();
  }

  async findOne(communityId: number): Promise<Community> {
    return await this.communityModel
      .findOne({
        communityId: communityId,
        deleted: false,
      })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT);
  }

  async update(
    communityId: number,
    community: CommunityCreateDto,
  ): Promise<Community> {
    const condition = { communityId: communityId, deleted: false };
    return await this.communityModel
      .findOneAndUpdate(condition, community, {
        new: true,
      })
      .select(globalConfig.fields.HIDE_FLDS_IN_RESULT);
  }

  async delete(communityId: number): Promise<any> {
    const condition = { communityId: communityId };
    return await this.communityModel.findOneAndUpdate(
      condition,
      { deleted: true },
      { new: true },
    );
  }

  async findByName(params: QueryPagination, term: string): Promise<Community[]> {
    const populate = {
      parent: globalConfig.fields.HIDE_FLDS_IN_RESULT,
    };
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.communityModel,
      params,
      { $text: { $search: term }, deleted: false },
      populate,
    );
    return await paginatedQuery.exec();
  }

}
