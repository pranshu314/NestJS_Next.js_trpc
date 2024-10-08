import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(private databaseService: DatabaseService) {}

  async createTodo(title: string, description?: string) {
    const id = uuidv4(); // Generate a unique ID
    const sql = `INSERT INTO Todo (id, title, description, createdAt, updatedAt)
                 VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    await this.databaseService.run(sql, [id, title, description || null]);
    return { id, title, description, status: 'pending' };
  }

  async getTodos() {
    const sql = `SELECT * FROM Todo`;
    return (await this.databaseService.all(sql)) as [
      {
        id: string;
        title: string;
        description: string | undefined;
        status: string;
      },
    ];
  }

  async getTodoById(id: string) {
    const sql = `SELECT * FROM Todo WHERE id = $1`;
    return (await this.databaseService.get(sql, [id])) as {
      id: string;
      title: string;
      description: string | undefined;
      status: string;
    };
  }

  async updateTodo(
    id: string,
    title: string,
    description: string,
    status: string,
  ) {
    const sql = `UPDATE Todo
                 SET title = $1, description = $2, status = $3, updatedAt = CURRENT_TIMESTAMP
                 WHERE id = $4`;
    await this.databaseService.run(sql, [title, description, status, id]);
    return { id, title, description, status };
  }

  async deleteTodo(id: string) {
    const sql = `DELETE FROM Todo WHERE id = $1`;
    await this.databaseService.run(sql, [id]);
    return { message: `Todo with id ${id} deleted` };
  }
}
