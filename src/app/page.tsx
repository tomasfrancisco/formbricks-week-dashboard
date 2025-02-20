"use client";

import { useState } from "react";

import { DashboardCard } from "@/components/dashboard-card/dashboard-card";

interface Dashboard {
  id: string;
  name: string;
  description: string;
  createdBy: {
    name: string;
    email: string;
  };
  lastUpdated: string;
  icon?: string; // For future customization
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
  ]);

  const deleteDashboard = (id: string) => {
    setDashboards(dashboards.filter((dashboard) => dashboard.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-6">
      {dashboards.map((dashboard) => (
        <DashboardCard
          href={`/dashboard/${dashboard.id}`}
          key={dashboard.id}
          createdBy={dashboard.createdBy.name}
          description={dashboard.description}
          lastUpdatedAt={dashboard.lastUpdated}
          onDelete={() => deleteDashboard(dashboard.id)}
          title={dashboard.name}
        />
      ))}
    </div>
  );
}
