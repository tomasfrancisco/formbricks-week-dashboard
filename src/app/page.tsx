"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, LayoutDashboard } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Dashboard {
  id: string
  name: string
  description: string
  createdBy: {
    name: string
    email: string
  }
  lastUpdated: string
  icon?: string // For future customization
}

export default function DashboardsPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: "1",
      name: "Product Analytics",
      description: "Key metrics and insights about our product",
      createdBy: {
        name: "John Doe",
        email: "john@example.com",
      },
      lastUpdated: "2024-02-19T14:23:00Z",
    },
    {
      id: "2",
      name: "User Feedback",
      description: "Customer satisfaction and feedback analysis",
      createdBy: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
      lastUpdated: "2024-02-12T09:00:00Z",
    },
  ])
  const [newDashboardName, setNewDashboardName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const createDashboard = () => {
    if (newDashboardName.trim()) {
      const newDashboard: Dashboard = {
        id: Math.random().toString(),
        name: newDashboardName,
        description: "New dashboard description",
        createdBy: {
          name: "Current User",
          email: "user@example.com",
        },
        lastUpdated: new Date().toISOString(),
      }
      setDashboards([...dashboards, newDashboard])
      setNewDashboardName("")
      setIsDialogOpen(false)
    }
  }

  const deleteDashboard = (id: string) => {
    setDashboards(dashboards.filter((dashboard) => dashboard.id !== id))
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboards</h1>
          <p className="text-muted-foreground mt-2">Create and manage your analytics dashboards</p>
        </div>
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
              <DialogDescription>Give your dashboard a name to get started.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Dashboard name</Label>
                <Input
                  id="name"
                  value={newDashboardName}
                  onChange={(e) => setNewDashboardName(e.target.value)}
                  placeholder="e.g., Product Analytics"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createDashboard}>Create Dashboard</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((dashboard) => (
          <Card key={dashboard.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                    <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="truncate">{dashboard.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/${dashboard.id}`}>View Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteDashboard(dashboard.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="mt-2">{dashboard.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>Created by </span>
                  <span className="font-medium text-foreground">{dashboard.createdBy.name}</span>
                </div>
                <div>
                  Last updated{" "}
                  {new Date(dashboard.lastUpdated).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

