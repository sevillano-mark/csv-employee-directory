import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryPagination } from 'src/models/query.pagination.model';

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): QueryPagination {
    const query = value;
    const queryParams: QueryPagination = new QueryPagination();
    if (query.page) queryParams.page = query.page;
    if (query.pageLimit) queryParams.pageLimit = query.pageLimit;
    if (query.orderBy) queryParams.orderBy = query.orderBy;
    if (query.order) queryParams.order = query.order;

    return queryParams;
  }
}
