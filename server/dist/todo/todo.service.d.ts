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
    getTodos(): Promise<[{
        id: string;
        title: string;
        description: string | undefined;
        status: string;
    }]>;
    getTodoById(id: string): Promise<{
        id: string;
        title: string;
        description: string | undefined;
        status: string;
    }>;
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
