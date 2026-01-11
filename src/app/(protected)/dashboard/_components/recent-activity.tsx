"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconUserPlus,
  IconCreditCard,
  IconX,
  IconCheck,
  IconClock,
} from "@tabler/icons-react";

export interface ActivityItem {
  id: string;
  type: "booking" | "payment" | "cancellation" | "status-change";
  title: string;
  description: string;
  user?: string;
  timestamp: Date;
  status?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking":
        return IconUserPlus;
      case "payment":
        return IconCreditCard;
      case "cancellation":
        return IconX;
      case "status-change":
        return IconCheck;
      default:
        return IconClock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950/30";
      case "payment":
        return "text-green-600 bg-green-50 dark:bg-green-950/30";
      case "cancellation":
        return "text-red-600 bg-red-50 dark:bg-red-950/30";
      case "status-change":
        return "text-purple-600 bg-purple-50 dark:bg-purple-950/30";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950/30";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (activities.length === 0) {
    return (
      <Card id="recent-activity">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activity
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="recent-activity">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
              >
                <div
                  className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="text-xs text-muted-foreground mt-1">
                      User: {activity.user}
                    </p>
                  )}
                  {activity.status && (
                    <Badge
                      variant={
                        activity.status === "paid"
                          ? "paid"
                          : activity.status === "pending"
                          ? "outline"
                          : "default"
                      }
                      className="mt-1 text-xs"
                    >
                      {activity.status}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

