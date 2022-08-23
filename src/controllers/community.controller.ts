import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { QueryPagination } from "src/dto/query-pagination.dto";
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
  @ApiQuery({ type: QueryPagination })
  async getAllCommunities(@Query(new QueryParamsPipe()) params) {
    try {
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
    } catch (e) {
      throw new InternalServerErrorException("ehe");
    }
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
    try {
      const communityCreated = await this.communityService.create(community);
      return {
        ...communityCreated,
        message: MessageConstants.results.SUCCESS.CREATE,
      };
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
    try {
      const community = await this.communityService.findOneWithSelection(
        communityId,
        ["_id"]
      );
      if (community) {
        if (
          (await this.communityService.countUsersOnCommunity(
            community["_id"]
          )) === 0
        ) {
          const communityDeleted = await this.communityService.delete(
            communityId
          );
          return {
            ...communityDeleted,
            message: MessageConstants.results.SUCCESS.DELETE,
          };
        } else {
          throw new BadRequestException(
            CustomErrors.CommunityCannotDeleteHasEmployee
          );
        }
      } else throw new BadRequestException(CustomErrors.CommunityNotFound);
    } catch (e) {
      if (e.name !== "BadRequestException") {
        throw new BadRequestException(CustomErrors.CommunityDeleteFailed);
      }
      return e;
    }
  }

  @Get("search/:term")
  @ApiQuery({ type: QueryPagination })
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
