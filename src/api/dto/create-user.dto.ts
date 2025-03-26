import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({
    description: 'The Slack token of the user',
  })
  @IsString()
  slackToken: string;

  @ApiProperty({
    description: 'The username of the user',
  })
  @IsString()
  username: string;
}
