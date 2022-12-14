import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export enum OrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export class QueryPagination {
  @ApiProperty({
    minimum: 1,
    maximum: 10000,
    title: "Page",
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: "int32",
    default: 1,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @IsOptional()
  page = 1;

  @ApiProperty({
    minimum: 1,
    maximum: 10000,
    title: "Page Limit",
    default: 10,
    format: "int32",
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @IsOptional()
  pageLimit = 10;

  @ApiProperty({
    title: "Page Limit",
    default: "_id",
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  orderBy = "_id";

  @ApiProperty({
    enum: OrderEnum,
    enumName: "OrderEnum",
    default: OrderEnum.ASC,
    required: false,
  })
  @IsEnum(OrderEnum)
  @IsOptional()
  order: OrderEnum = OrderEnum.ASC;
}
