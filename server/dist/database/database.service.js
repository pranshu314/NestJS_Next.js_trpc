"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const dotenv = require("dotenv");
let DatabaseService = class DatabaseService {
    onModuleInit() {
        dotenv.config();
        this.pool = new pg_1.Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT
                ? Number(process.env.POSTGRES_PORT)
                : 5432,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        this.pool.query(`
      CREATE TABLE IF NOT EXISTS Todo (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
            else {
                console.log('Todo table created or already exists.');
            }
        });
    }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result.rows[0]);
            });
        });
    }
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result.rows);
            });
        });
    }
    close() {
        this.pool
            .end()
            .then(() => {
            console.log('Closed the PostgreSQL database connection.');
        })
            .catch((err) => {
            console.error('Error closing the database connection:', err.message);
        });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map