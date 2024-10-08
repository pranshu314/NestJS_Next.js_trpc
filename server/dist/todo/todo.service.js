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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const uuid_1 = require("uuid");
let TodoService = class TodoService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async createTodo(title, description) {
        const id = (0, uuid_1.v4)();
        const sql = `INSERT INTO Todo (id, title, description, createdAt, updatedAt)
                 VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        await this.databaseService.run(sql, [id, title, description || null]);
        return { id, title, description, status: 'pending' };
    }
    async getTodos() {
        const sql = `SELECT * FROM Todo`;
        return (await this.databaseService.all(sql));
    }
    async getTodoById(id) {
        const sql = `SELECT * FROM Todo WHERE id = $1`;
        return (await this.databaseService.get(sql, [id]));
    }
    async updateTodo(id, title, description, status) {
        const sql = `UPDATE Todo
                 SET title = $1, description = $2, status = $3, updatedAt = CURRENT_TIMESTAMP
                 WHERE id = $4`;
        await this.databaseService.run(sql, [title, description, status, id]);
        return { id, title, description, status };
    }
    async deleteTodo(id) {
        const sql = `DELETE FROM Todo WHERE id = $1`;
        await this.databaseService.run(sql, [id]);
        return { message: `Todo with id ${id} deleted` };
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TodoService);
//# sourceMappingURL=todo.service.js.map