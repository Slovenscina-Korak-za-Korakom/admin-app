"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconAlertCircle,
  IconClock,
  IconCreditCard,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";

export interface Alert {
  id: string;
  type: "pending-payment" | "low-capacity" | "upcoming-event" | "cancellation";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
  timestamp: Date;
}

interface AlertsSectionProps {
  alerts: Alert[];
}

export function AlertsSection({ alerts }: AlertsSectionProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "pending-payment":
        return IconCreditCard;
      case "low-capacity":
        return IconAlertCircle;
      case "upcoming-event":
        return IconClock;
      case "cancellation":
        return IconX;
      default:
        return IconAlertCircle;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20";
      case "medium":
        return "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "low":
        return "border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
      default:
        return "";
    }
  };

  const highPriorityAlerts = alerts.filter((a) => a.priority === "high");
  const otherAlerts = alerts.filter((a) => a.priority !== "high");

  if (alerts.length === 0) {
    return (
      <Card id="alerts">
        <CardHeader>
          <CardTitle>Alerts & Priority Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No pending actions. Everything looks good!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="alerts">
      <CardHeader>
        <CardTitle>Alerts & Priority Tasks ({alerts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {highPriorityAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`rounded-lg p-3 ${getAlertColor(alert.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-red-600 dark:text-red-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <Badge variant="destructive" className="text-xs">
                        High
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    {alert.actionUrl && (
                      <Link href={alert.actionUrl} className="mt-2 inline-block">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {otherAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`rounded-lg p-3 ${getAlertColor(alert.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-orange-600 dark:text-orange-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    {alert.actionUrl && (
                      <Link href={alert.actionUrl} className="mt-2 inline-block">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

