import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { OrderEnum, QueryPagination } from "src/models/query.pagination.model";

@Injectable()
export class PaginationHelper {

    generatePaginationQuery(model : Model<any>, pagination: QueryPagination, select: any = {}) {
        let query = model.find(select);
        let sort: any = {};

        sort[pagination.orderBy] = (pagination.order == OrderEnum.desc) ? -1 : 1;

        query = query.sort(sort);

        if(pagination.page > 1) {
            query = query.skip(pagination.pageLimit * (pagination.page - 1));
        }

        query = query.limit(pagination.pageLimit);

        return query;
    }
}