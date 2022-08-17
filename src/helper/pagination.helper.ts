import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderEnum, QueryPagination } from 'src/models/query.pagination.model';

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

    sort[pagination.orderBy] = pagination.order == OrderEnum.desc ? -1 : 1;

    query = query.sort(sort);

    if (pagination.page > 1) {
      query = query.skip(pagination.pageLimit * (pagination.page - 1));
    }

    query = query.limit(pagination.pageLimit);

    return query;
  }
}
