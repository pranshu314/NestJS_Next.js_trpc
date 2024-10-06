import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { TodoModule } from '@server/todo/todo.module';

@Module({
  imports: [TodoModule],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
