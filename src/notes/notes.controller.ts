/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'The note has been successfully created.' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, description: 'List of all notes' })
  findAll(): Promise<import("c:/Users/User/OneDrive/Desktop/First project/Notebook Endpoints/notebook/src/notes/Interface/note.interface").Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the note' })
  @ApiResponse({ status: 200, description: 'The note with the specified ID' })
  @ApiResponse({ status: 404, description: 'Note not found', type: Object })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the note to update' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: 'The updated note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the note to delete' })
  @ApiResponse({ status: 204, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}

