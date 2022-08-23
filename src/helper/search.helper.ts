import { Injectable } from "@nestjs/common";
import { EmployeeSearchQuery } from "src/dto/employee-query-search-dto";
import { CommunityService } from "src/services/community.service";

@Injectable()
export class SearchHelper {
  constructor(private communityService: CommunityService) {}

  async generateSearchQuery(params: EmployeeSearchQuery) {
    let orArr = [];
    const andArr = [];
    if (params.name) {
      const regexName = new RegExp([".*", params.name, ".*"].join(""), "i");
      orArr.push({ firstName: { $regex: regexName } });
      orArr.push({ lastName: { $regex: regexName } });
      andArr.push({ $or: orArr });
      orArr = [];
    }

    if (params.email) {
      const regexEmail = new RegExp([".*", params.email, ".*"].join(""), "i");
      orArr.push({ email: { $regex: regexEmail } });
      andArr.push({ $or: orArr });
      orArr = [];
    }

    if (params.community) {
      const communities = await this.communityService.searchByName(
        params.community
      );

      for (const community of communities) {
        orArr.push({ community: community["_id"] });
      }
      andArr.push({ $or: orArr });
    }

    if (params.hireYear) {
      const start = new Date(params.hireYear, 1, 1);
      const end = new Date(params.hireYear, 12, 31);
      andArr.push({ hireDate: { $gte: start, $lte: end } });
    }
    return { $and: [{ $and: andArr }, { deleted: false }] };
  }
}
