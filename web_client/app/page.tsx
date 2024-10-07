"use client";

import { useEffect, useState } from "react";
import { trpc } from "./trpc/trpc";
import { columns } from "./todos/columns";
import { DataTable } from "./todos/data-table";
import { AddDemo } from "./todos/add-todo";

export default function TodoPage() {
  const [todos, setTodos] = useState<
    {
      title: string;
      status: string;
      description?: string | undefined;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    trpc.getTodos.query().then((todos) => setTodos(todos));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <center>
        <AddDemo setTodos={setTodos}></AddDemo>
      </center>
      {todos.length > 0 ? (
        <DataTable columns={columns(setTodos)} data={todos} />
      ) : (
        <center>Loading...</center>
      )}
      {/* <DataTable columns={columns} data={todos} /> */}
    </div>
  );
}
