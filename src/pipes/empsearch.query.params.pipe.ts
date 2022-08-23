import { PipeTransform, Injectable } from "@nestjs/common";
import { EmployeeSearchQuery } from "src/dto/employee-query-search-dto";

@Injectable()
export class EmpSearchQueryParamsPipe implements PipeTransform {
  transform(value: any): EmployeeSearchQuery {
    const query = value;
    const queryParams: EmployeeSearchQuery = new EmployeeSearchQuery();
    if (query.page) queryParams.page = Number(query.page);
    if (query.pageLimit) queryParams.pageLimit = Number(query.pageLimit);
    if (query.orderBy) queryParams.orderBy = query.orderBy;
    if (query.order) queryParams.order = query.order;

    if (query.name) queryParams.name = query.name;
    if (query.email) queryParams.email = query.email;
    if (query.community) queryParams.community = query.community;
    if (query.hireYear) queryParams.hireYear = Number(query.hireYear);

    return queryParams;
  }
}
