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
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommunityCreateDto } from "src/dto/community-create.dto";
import { Pagination } from "src/models/pagination.model";
import { QueryParamsPipe } from "src/pipes/query.params.pipe";
import { CommunityService } from "src/services/community.service";
import { CustomErrors } from "src/shared/errors/custom.errors";
import { MessageConstants } from "src/shared/message.constants";

@ApiTags("Community")
@Controller({ path: "community" })
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
    return {
      ...paginatedResult,
      message: MessageConstants.results.SUCCESS.FIND_ALL,
    };
  }

  @Get(":id")
  async getCommunity(@Param("id") communityId: number) {
    const community = await this.communityService.findOne(communityId);
    if (community)
      return {
        ...community,
        message: MessageConstants.results.SUCCESS.FIND,
      };
    else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }

  @Post()
  async createCommunity(@Body() community: CommunityCreateDto) {
    const communityCreated = await this.communityService.create(community);
    return {
      ...communityCreated,
      message: MessageConstants.results.SUCCESS.CREATE,
    };
  }

  @Put(":id")
  async updateCommunity(
    @Param("id") communityId: number,
    @Body() community: CommunityCreateDto
  ) {
    const communityUpdated = await this.communityService.update(
      communityId,
      community
    );
    if (communityUpdated) {
      return {
        ...communityUpdated,
        message: MessageConstants.results.SUCCESS.UPDATE,
      };
    } else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }

  @Delete(":id")
  async deleteCommunity(@Param("id") communityId: number) {
    const communityDeleted = await this.communityService.delete(communityId);
    if (communityDeleted) {
      return {
        ...communityDeleted,
        message: MessageConstants.results.SUCCESS.DELETE,
      };
    } else throw new BadRequestException(CustomErrors.CommunityNotFound);
  }

  @Get("search/:term")
  async searchByName(
    @Query(new QueryParamsPipe()) params,
    @Param("term") term: string
  ) {
    const communityList = await this.communityService.findByName(params, term);
    const paginatedResult: Pagination = {
      results: communityList,
      currentPage: params.page,
      pageSize: params.pageLimit,
    };
    return {
      ...paginatedResult,
      message: MessageConstants.results.SUCCESS.SEARCH,
    };
  }
}
