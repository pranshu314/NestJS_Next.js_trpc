import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { TodoService } from '@server/todo/todo.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly todoService: TodoService,
  ) {}

  appRouter = this.trpc.router({
    getEcho: this.trpc.procedure.query(() => {
      return `The server is up and running.`;
    }),

    createTodo: this.trpc.procedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.todoService.createTodo(
          input.title,
          input.description,
        );
      }),

    getTodos: this.trpc.procedure.query(async () => {
      return await this.todoService.getTodos();
    }),

    getTodo: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.todoService.getTodoById(input);
    }),

    updateTodo: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(['pending', 'completed']).optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.todoService.updateTodo(
          input.id,
          input.title || '',
          input.description || '',
          input.status || 'pending',
        );
      }),

    deleteTodo: this.trpc.procedure
      .input(z.string())
      .mutation(async ({ input }) => {
        return await this.todoService.deleteTodo(input);
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/v1`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
