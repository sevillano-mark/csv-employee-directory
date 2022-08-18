import { PipeTransform, Injectable } from '@nestjs/common';
import { QueryPagination } from 'src/dto/query-pagination.dto';

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(value: any): QueryPagination {
    const query = value;
    const queryParams: QueryPagination = new QueryPagination();
    if (query.page) queryParams.page = Number(query.page);
    if (query.pageLimit) queryParams.pageLimit = Number(query.pageLimit);
    if (query.orderBy) queryParams.orderBy = query.orderBy;
    if (query.order) queryParams.order = query.order;

    return queryParams;
  }
}
