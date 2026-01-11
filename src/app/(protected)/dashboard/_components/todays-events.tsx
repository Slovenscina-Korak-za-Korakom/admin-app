"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconMapPin,
  IconClock,
  IconUsers,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";

export interface TodaysEvent {
  id: number;
  theme: string;
  tutor: string;
  date: Date;
  time: string;
  location: string;
  peopleBooked: number;
  maxBooked: number;
  price: string;
  level?: string;
  description?: string;
}

interface TodaysEventsProps {
  events: TodaysEvent[];
}

export function TodaysEvents({ events }: TodaysEventsProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBookingStatus = (booked: number, max: number) => {
    const percentage = (booked / max) * 100;
    if (percentage >= 90) return { label: "Almost Full", variant: "destructive" as const };
    if (percentage >= 50) return { label: "Good", variant: "default" as const };
    if (percentage > 0) return { label: "Low", variant: "outline" as const };
    return { label: "No Bookings", variant: "outline" as const };
  };

  if (events.length === 0) {
    return (
      <Card id="events-today">
        <CardHeader>
          <CardTitle>Today&apos;s Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No events scheduled for today
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="events-today">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today&apos;s Events ({events.length})</CardTitle>
          <Link href="/language-club">
            <Button variant="ghost" size="sm">
              View All <IconChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => {
            const status = getBookingStatus(event.peopleBooked, event.maxBooked);
            return (
              <div
                key={event.id}
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1">{event.theme}</h4>
                    <p className="text-sm text-muted-foreground">{event.tutor}</p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconClock className="h-4 w-4" />
                    <span>{formatTime(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconMapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconUsers className="h-4 w-4" />
                    <span>
                      {event.peopleBooked} / {event.maxBooked} booked
                    </span>
                  </div>
                  {event.level && (
                    <div className="text-muted-foreground">
                      Level: {event.level}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <Link href={`/language-club/booking?id=${event.id}`}>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Bookings
                    </Button>
                  </Link>
                  <Link href="/language-club">
                    <Button variant="ghost" size="sm">
                      Edit
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

