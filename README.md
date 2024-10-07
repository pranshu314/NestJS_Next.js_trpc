# Todo App
This is a simple todolist application that has been built on top of a trpc api made in NestJS and the frontend is in Next.js.

## Setup
- Note: Need to run `make run_server` and `make run_web` on two different terminal sessions.
```bash
git clone https://github.com/pranshu314/NestJS_Next.js_trpc.git
cd NestJS_Next.js_trpc/
make run_server
make run_web
```
## Implementation
trpc implements 6 functions.
- getEcho
- createTodo
- getTodos
- getTodo
- updateTodo
- deleteTodo
