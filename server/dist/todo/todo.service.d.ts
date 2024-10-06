import { DatabaseService } from '../database/database.service';
export declare class TodoService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    createTodo(title: string, description?: string): Promise<{
        id: string;
        title: string;
        description: string | undefined;
        status: string;
    }>;
    getTodos(): Promise<any[]>;
    getTodoById(id: string): Promise<any>;
    updateTodo(id: string, title: string, description: string, status: string): Promise<{
        id: string;
        title: string;
        description: string;
        status: string;
    }>;
    deleteTodo(id: string): Promise<{
        message: string;
    }>;
}
