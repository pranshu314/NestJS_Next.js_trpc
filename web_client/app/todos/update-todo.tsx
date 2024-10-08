"use client";

import { Button } from "@web/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@web/components/ui/dialog";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { useState } from "react";
import { trpc } from "../trpc/trpc";

export function UpdateDemo({ setTodos, todo_id }) {
  type TodoStatus = "completed" | "pending";
  const [title, setTitle] = useState("Todo Title");
  const [description, setDescription] = useState("Todo Description");
  const [status, setStatus] = useState<TodoStatus>("pending");

  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Update Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>
            Update the todo-list entry here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              defaultValue=""
              value={status}
              onChange={(e) => setStatus(e.target.value as TodoStatus)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              trpc.updateTodo.mutate({
                id: todo_id,
                title,
                description,
                status,
              });
              setTitle("Todo Title");
              setDescription("Todo Description");
              setIsOpen(false);
              const updatedTodos = await trpc.getTodos.query();
              setTodos(updatedTodos);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
