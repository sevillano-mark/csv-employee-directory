import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { QueryPagination } from "./query-pagination.dto";

export class EmployeeSearchQuery extends QueryPagination {
  @ApiProperty({
    title: "Email",
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    title: "Community",
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  community?: string;

  @ApiProperty({
    title: "Name",
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    title: "Hire Year",
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  hireYear?: number;
}
