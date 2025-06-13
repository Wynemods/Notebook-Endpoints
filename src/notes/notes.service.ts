/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './Interface/note.interface';


import { Pool, PoolConfig } from 'pg';

const connectionString: string =
  typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.length > 0
    ? process.env.DATABASE_URL
    : 'postgresql://postgres:Alexmods@localhost:5432/notebook';

const pool: Pool = new Pool({ connectionString } as PoolConfig);
@Injectable()
export class NotesService {
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, content } = createNoteDto;
    const query =
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *';
    const values = [title, content];
    try {
      const result = await pool.query<Note>(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Database error during note creation: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async findAll(): Promise<Note[]> {
    const query = 'SELECT * FROM notes ORDER BY id ASC';
    try {
      const result = await pool.query(query);
      return result.rows as Note[];
    } catch (error) {
      throw new Error('Database error during fetching notes: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async findOne(id: number): Promise<Note> {
    const query = 'SELECT * FROM notes WHERE id = $1';
    try {
      const result = await pool.query<Note>(query, [id]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new Error('Database error during fetching note: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const { title, content } = updateNoteDto;
    const query =
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *';
    const values = [title, content, id];
    try {
      const result = await pool.query<Note>(query, values);
      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new Error('Database error during note update: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM notes WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if ((result as { rowCount?: number }).rowCount === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error('Database error during note deletion: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
}
