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
let TrpcRouter = class TrpcRouter {
    constructor(trpc) {
        this.trpc = trpc;
        this.appRouter = this.trpc.router({
            getEcho: this.trpc.procedure.query(() => {
                return `The server is up and running.`;
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
    __metadata("design:paramtypes", [trpc_service_1.TrpcService])
], TrpcRouter);
//# sourceMappingURL=trpc.router.js.map