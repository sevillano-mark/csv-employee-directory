import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityCreateDto } from 'src/dto/community-create.dto';
import { PaginationHelper } from 'src/helper/pagination.helper';
import { Community, CommunityDocument } from 'src/models/community.schema';
import { QueryPagination } from 'src/models/query.pagination.model';

@Injectable()
export class CommunityService {
    
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>, 
    public paginationHelper: PaginationHelper) {}

    async create(communityCreateDto: CommunityCreateDto) : Promise<Community> {
        const community = new this.communityModel(communityCreateDto);
        return community.save();
    }

    async findAll(params: QueryPagination): Promise<Community[]> {
        var paginatedQuery = this.paginationHelper.generatePaginationQuery(this.communityModel, params, { deleted: false });
        return await paginatedQuery.exec();
    }

    async findOne(communityId: string): Promise<Community> {
        return await this.communityModel.findOne({ _id: communityId, deleted: false });
    }

    async update(communityId: string, community: CommunityCreateDto): Promise<Community> {
        const condition = { _id: communityId, deleted: false };
        return await this.communityModel.findOneAndUpdate(condition, community, { new: true });
    }

    async delete(communityId: string): Promise<any> {
        const condition = { _id: communityId };
        return await this.communityModel.findOneAndUpdate(condition, { deleted: true }, { new: true });
    }
}
