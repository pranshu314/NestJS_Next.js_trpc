import { OnModuleInit } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit {
    private db;
    onModuleInit(): void;
    run(sql: string, params?: any[]): Promise<void>;
    get(sql: string, params?: any[]): Promise<any>;
    all(sql: string, params?: any[]): Promise<any[]>;
    close(): void;
}
