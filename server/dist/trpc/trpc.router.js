"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrpcRouter = void 0;
const common_1 = require("@nestjs/common");
const trpc_service_1 = require("./trpc.service");
const trpcExpress = require("@trpc/server/adapters/express");
const zod_1 = require("zod");
const todo_service_1 = require("../todo/todo.service");
let TrpcRouter = class TrpcRouter {
    constructor(trpc, todoService) {
        this.trpc = trpc;
        this.todoService = todoService;
        this.appRouter = this.trpc.router({
            getEcho: this.trpc.procedure.query(() => {
                return `The server is up and running.`;
            }),
            createTodo: this.trpc.procedure
                .input(zod_1.z.object({
                title: zod_1.z.string(),
                description: zod_1.z.string().optional(),
            }))
                .mutation(async ({ input }) => {
                return await this.todoService.createTodo(input.title, input.description);
            }),
            getTodos: this.trpc.procedure.query(async () => {
                return await this.todoService.getTodos();
            }),
            getTodo: this.trpc.procedure.input(zod_1.z.string()).query(async ({ input }) => {
                return await this.todoService.getTodoById(input);
            }),
            updateTodo: this.trpc.procedure
                .input(zod_1.z.object({
                id: zod_1.z.string(),
                title: zod_1.z.string().optional(),
                description: zod_1.z.string().optional(),
                status: zod_1.z.enum(['pending', 'completed']).optional(),
            }))
                .mutation(async ({ input }) => {
                return await this.todoService.updateTodo(input.id, input.title || '', input.description || '', input.status || 'pending');
            }),
            deleteTodo: this.trpc.procedure
                .input(zod_1.z.string())
                .mutation(async ({ input }) => {
                return await this.todoService.deleteTodo(input);
            }),
        });
    }
    async applyMiddleware(app) {
        app.use(`/v1`, trpcExpress.createExpressMiddleware({
            router: this.appRouter,
        }));
    }
};
exports.TrpcRouter = TrpcRouter;
exports.TrpcRouter = TrpcRouter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trpc_service_1.TrpcService,
        todo_service_1.TodoService])
], TrpcRouter);
//# sourceMappingURL=trpc.router.js.map