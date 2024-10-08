"use client";

/* eslint-disable @next/next/no-async-client-component */
import * as React from "react";

import { Button } from "@web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import { useSearchParams } from "next/navigation";
import { trpc } from "../trpc/trpc";

export default function CardWithForm() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  type TodoStatus = "completed" | "pending";

  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("Todo Title");
  const [description, setDescription] = React.useState("Todo Description");
  const [status, setStatus] = React.useState<TodoStatus>("pending");

  // const todo = trpc.getTodo.query(id);
  React.useEffect(() => {
    const fetchTodo = async () => {
      if (id == null) {
        console.error("Id is null");
        return;
      }

      try {
        const todo = await trpc.getTodo.query(id);

        setTitle(todo.title);
        setDescription(todo.description || "Todo Description");
        setStatus((todo.status as TodoStatus) || "pending");
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Todo</CardTitle>
          <CardDescription>Update the todo entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  defaultValue={description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as TodoStatus)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder={status} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="completed">completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => (window.location.href = `/`)}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (id === null) {
                console.error("id is null");
                return;
              }
              await trpc.updateTodo.mutate({ id, title, description, status });
              window.location.href = `/`;
            }}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
