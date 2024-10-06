import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [TodoService, DatabaseService],
  exports: [TodoService],
})
export class TodoModule {}
