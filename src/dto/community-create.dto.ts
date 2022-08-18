import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommunityCreateDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public communityId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public description: string;
}
