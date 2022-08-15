import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsDate()
  public hiredate: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  communityId: Types.ObjectId;
}

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (
    Types.ObjectId.isValid(value) &&
    new Types.ObjectId(value).toString() === value
  ) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}
