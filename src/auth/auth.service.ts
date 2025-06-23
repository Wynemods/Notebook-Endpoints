/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  password: string;
  [key: string]: any;
}

const connectionString: string =
  typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.length > 0
    ? process.env.DATABASE_URL
    : 'postgresql://postgres:Alexmods@localhost:5432/Notebook Endpoints';

const pool: Pool = new Pool({ connectionString });

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      const user: User | undefined = result.rows[0];
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...resultUser } = user;
        return resultUser;
      }
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error validating user: ${error.message}`, error.stack);
      } else {
        this.logger.error('Unknown error validating user');
      }
      throw error;
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const user = await this.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      const accessToken = Buffer.from(
        `${username}:${new Date().getTime()}`,
      ).toString('base64');
      return { accessToken };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Login error: ${error.message}`, error.stack);
      } else {
        this.logger.error('Unknown login error');
      }
      throw error;
    }
  }

  async register(username: string, password: string): Promise<Omit<User, 'password'>> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username';
      const result = await pool.query(query, [username, hashedPassword]);
      return result.rows[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Registration error: ${error.message}`, error.stack);
      } else {
        this.logger.error('Unknown registration error');
      }
      throw error;
    }
  }
}
