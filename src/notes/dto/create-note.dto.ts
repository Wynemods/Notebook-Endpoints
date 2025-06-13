/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    example: 'My Note Title',
    description: 'Title of the note',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is the content of the note.',
    description: 'Content of the note',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
