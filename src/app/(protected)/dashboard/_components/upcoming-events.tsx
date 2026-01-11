"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconMapPin,
  IconClock,
  IconUsers,
  IconChevronRight,
  IconCalendarEvent,
} from "@tabler/icons-react";
import Link from "next/link";
import { TodaysEvent } from "./todays-events";

interface UpcomingEventsProps {
  events: TodaysEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBookingPercentage = (booked: number, max: number) => {
    return Math.round((booked / max) * 100);
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming events in the next week
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Events (Next 7 Days)</CardTitle>
          <Link href="/language-club">
            <Button variant="ghost" size="sm">
              View All <IconChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => {
            const percentage = getBookingPercentage(
              event.peopleBooked,
              event.maxBooked
            );
            const isLowCapacity = percentage < 30;
            const isHighCapacity = percentage >= 80;

            return (
              <div
                key={event.id}
                className="border rounded-lg p-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <IconCalendarEvent className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <h4 className="font-medium text-sm truncate">
                        {event.theme}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.tutor}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isLowCapacity && (
                      <Badge variant="outline" className="text-xs">
                        Low
                      </Badge>
                    )}
                    {isHighCapacity && (
                      <Badge variant="default" className="text-xs">
                        {percentage}% Full
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <IconClock className="h-3 w-3" />
                    <span>{formatDate(event.date)}</span>
                    <span className="mx-1">•</span>
                    <span>{formatTime(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconMapPin className="h-3 w-3" />
                    <span className="truncate max-w-[100px]">
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IconUsers className="h-3 w-3" />
                    <span>
                      {event.peopleBooked} / {event.maxBooked}
                    </span>
                  </div>
                  <Link href={`/language-club/booking?id=${event.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

