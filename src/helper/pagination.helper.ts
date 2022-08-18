import { BadRequestException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { OrderEnum, QueryPagination } from 'src/dto/query-pagination.dto';

@Injectable()
export class PaginationHelper {
  generatePaginationQuery(
    model: Model<any>,
    pagination: QueryPagination,
    select: any = {},
    populate: any = undefined,
  ) {
    let query = model.find(select);
    const sort: any = {};

    if (populate && populate.parent) {
      query = query.select(populate.parent);
    }

    if (populate && populate.sub) {
      for (const p of populate.sub) {
        query = query.populate(p);
      }
    }

    sort[pagination.orderBy] = pagination.order == OrderEnum.DESC ? -1 : 1;

    query = query.sort(sort);

    if (pagination.page > 1) {
      query = query.skip(pagination.pageLimit * (pagination.page - 1));
    }

    query = query.limit(pagination.pageLimit);

    return query;
  }

  async queryPaginationValidate(queryParams: QueryPagination) {
    const validationError = await validate(queryParams);
    if (validationError && validationError.length > 0) {
      throw new BadRequestException(validationError.map((e) => e.constraints));
    }
  }
}
