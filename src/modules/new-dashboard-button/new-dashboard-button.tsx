import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

interface NewDashboardButtonProps {
  onCreate: ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => void;
}
export function NewDashboardButton({ onCreate }: NewDashboardButtonProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onCreateHandler = useCallback(
    () =>
      onCreate({
        name,
        description,
      }),
    [description, name, onCreate]
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Dashboard</DialogTitle>
          <DialogDescription>
            Configure your dashboard details.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Dashboard name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Product Analytics"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tracking of successful conversations of feature #32"
            />
            <p
              data-slot="form-description"
              className="text-muted-foreground text-sm"
            >
              Help your teammates understand what this dashboard is about.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onCreateHandler}>Create Dashboard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
