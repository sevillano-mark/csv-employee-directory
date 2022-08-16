import { ApiProperty } from "@nestjs/swagger";

export enum OrderEnum {
    asc = 'ASC',
    desc = 'DESC'
}

export class QueryPagination {
    @ApiProperty({
        minimum: 0,
        maximum: 10000,
        title: 'Page',
        exclusiveMaximum: true,
        exclusiveMinimum: true,
        format: 'int32',
        default: 1,
        required: true
    })
    page: number = 1;

    @ApiProperty({default: 10, required: false})
    pageLimit: number = 10;

    @ApiProperty({ default: '_id', required: false})
    orderBy: string = '_id';

    @ApiProperty({
        enum: OrderEnum,
        enumName: 'OrderEnum',
        default: OrderEnum.asc,
        required: false
    })
    order: OrderEnum = OrderEnum.asc;
}