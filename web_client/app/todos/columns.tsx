"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@web/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { trpc } from "../trpc/trpc";

export const columns = (
  setTodos: React.Dispatch<React.SetStateAction<any[]>>,
): ColumnDef<
  {
    title: string;
    id: string;
    status: string;
    description?: string | undefined;
  },
  unknown
>[] => {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const todo = row.original;

        const handleDelete = async (id: string) => {
          try {
            await trpc.deleteTodo.mutate(id); // Directly call the mutation
            const updatedTodos = await trpc.getTodos.query();
            setTodos(updatedTodos);
          } catch (error) {
            console.error("Error deleting todo:", error);
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(todo.id)}
              >
                <Button variant="ghost">Copy todo ID</Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* TODO: Add onClick functionality for Update */}
              <DropdownMenuItem
                onClick={() => (window.location.href = `/update?id=${todo.id}`)}
              >
                <Button variant="ghost">Update Todo</Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => handleDelete(todo.id)}
              >
                <Button variant="ghost">Delete Todo</Button>
              </DropdownMenuItem>
              {/* <DeleteTodoAction todoId={todo.id} /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
