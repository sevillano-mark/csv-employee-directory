import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommunityCreateDto } from 'src/dto/community-create.dto';
import { Pagination } from 'src/models/pagination.model';
import { QueryParamsPipe } from 'src/pipes/query.params.pipe';
import { CommunityService } from 'src/services/community.service';
import { CustomErrors } from 'src/shared/errors/custom.errors';

@ApiTags('Community')
@Controller({ path: 'community' })
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get()
  async getAllCommunities(@Query(new QueryParamsPipe()) params) {
    const communityList = await this.communityService.findAll(params);
    const paginatedResult: Pagination = {
      results: communityList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return paginatedResult;
  }

  @Get(':id')
  async getCommunity(@Param('id') communityId: number) {
    const community = await this.communityService.findOne(communityId);
    if (community) return { community };
    else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }

  @Post()
  async createCommunity(@Body() community: CommunityCreateDto) {
    const communityCreated = await this.communityService.create(community);
    return communityCreated;
  }

  @Put(':id')
  async updateCommunity(
    @Param('id') communityId: number,
    @Body() community: CommunityCreateDto,
  ) {
    const communityUpdated = await this.communityService.update(
      communityId,
      community,
    );
    if (communityUpdated) return communityUpdated;
    else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }

  @Delete(':id')
  async deleteCommunity(@Param('id') communityId: number) {
    const communityDeleted = await this.communityService.delete(communityId);
    if (communityDeleted) return communityDeleted;
    else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }
}
