import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityCreateDto } from 'src/dto/community-create.dto';
import { PaginationHelper } from 'src/helper/pagination.helper';
import { Community, CommunityDocument } from 'src/models/community.schema';
import { QueryPagination } from 'src/models/query.pagination.model';
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
    const paginatedQuery = this.paginationHelper.generatePaginationQuery(
      this.communityModel,
      params,
      { deleted: false },
    );
    return await paginatedQuery.exec();
  }

  async findOne(communityId: number): Promise<Community> {
    return await this.communityModel.findOne({
      communityId: communityId,
      deleted: false,
    });
  }

  async update(
    communityId: number,
    community: CommunityCreateDto,
  ): Promise<Community> {
    const condition = { communityId: communityId, deleted: false };
    return await this.communityModel.findOneAndUpdate(condition, community, {
      new: true,
    });
  }

  async delete(communityId: number): Promise<any> {
    const condition = { communityId: communityId };
    return await this.communityModel.findOneAndUpdate(
      condition,
      { deleted: true },
      { new: true },
    );
  }
}
