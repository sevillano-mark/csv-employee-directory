import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeCreateDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public employeeNumber: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  public hireDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  communityId: number;
}
