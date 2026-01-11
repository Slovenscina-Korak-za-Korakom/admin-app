"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  IconPlus,
  IconCalendarEvent,
  IconClock,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      label: "Create Event",
      icon: IconPlus,
      href: "/language-club",
      variant: "default" as const,
    },
    {
      label: "View Events",
      icon: IconCalendarEvent,
      href: "/language-club",
      variant: "outline" as const,
    },
    {
      label: "Manage Sessions",
      icon: IconClock,
      href: "/my-schedule",
      variant: "outline" as const,
    },
    {
      label: "Search",
      icon: IconSearch,
      href: "/language-club",
      variant: "outline" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Button
                  variant={action.variant}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon className="h-4 w-4 mr-2"/>
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

