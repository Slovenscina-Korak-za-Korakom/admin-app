"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  IconCalendarEvent,
  IconClock,
  IconAlertCircle,
  IconTrendingUp,
} from "@tabler/icons-react";
import Link from "next/link";

interface OverviewCardsProps {
  eventsToday: number;
  sessionsToday: number;
  pendingActions: number;
  newBookingsToday: number;
}

export function OverviewCards({
                                eventsToday,
                                sessionsToday,
                                pendingActions,
                                newBookingsToday,
                              }: OverviewCardsProps) {
  const cards = [
    {
      title: "Events Today",
      value: eventsToday,
      icon: IconCalendarEvent,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      link: "#events-today",
      description: "Scheduled for today",
    },
    {
      title: "Sessions Today",
      value: sessionsToday,
      icon: IconClock,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      link: "#sessions-today",
      description: "Timeblocks scheduled",
    },
    {
      title: "Pending Actions",
      value: pendingActions,
      icon: IconAlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      link: "#alerts",
      description: "Require attention",
      highlight: pendingActions > 0,
    },
    {
      title: "New Bookings",
      value: newBookingsToday,
      icon: IconTrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      link: "#recent-activity",
      description: "Last 24 hours",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link key={card.title} href={card.link} className="block">
            <Card
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                card.highlight ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`}/>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

