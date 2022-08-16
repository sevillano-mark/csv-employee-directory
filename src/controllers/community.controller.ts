import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommunityCreateDto } from 'src/dto/community-create.dto';
import { Pagination } from 'src/models/pagination.model';
import { QueryParamsPipe } from 'src/pipes/query.params.pipe';
import { CommunityService } from 'src/services/community.service';

@ApiTags('Community')
@Controller('Community')
export class CommunityController {

    constructor(private communityService: CommunityService) {}

    @Get()
    async getAllCommunities(@Query(new QueryParamsPipe()) params) {
        const communityList = await this.communityService.findAll(params);
        const paginatedResult : Pagination = {
            results: communityList,
            currentPage: params.page,
            pageSize: params.pageLimit,
        }
        return paginatedResult;
    }

    @Get(':id')
    async getCommunity(@Param('id') communityId: string) {
        const community = await this.communityService.findOne(communityId);
        if (community)
            return { community };
        else
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @Post()
    async createCommunity(@Body() community: CommunityCreateDto) {
        const communityCreated = await this.communityService.create(community);
        return communityCreated;
    }

    @Put(':id')
    async updateCommunity(@Param('id') communityId: string, @Body() community: CommunityCreateDto) {

        if (!communityId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        const communityUpdated = await this.communityService.update(communityId, community);
        if (communityUpdated)
            return communityUpdated;
        else
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    async deleteCommunity(@Param('id') communityId: string) {
        const communityDeleted = await this.communityService.delete(communityId);
        return communityDeleted;
    }
}
