"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  IconMapPin,
  IconClock,
  IconUser,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";

export interface TodaysSession {
  id: number;
  studentName: string;
  studentId: string;
  tutorName: string;
  startTime: Date;
  duration: number;
  status: "booked" | "available" | "cancelled" | "completed" | "no-show";
  sessionType: "private" | "group" | "workshop";
  location: string;
}

interface TodaysSessionsProps {
  sessions: TodaysSession[];
}

export function TodaysSessions({sessions}: TodaysSessionsProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "success" | "outline"> = {
      booked: "default",
      available: "secondary",
      cancelled: "destructive",
      completed: "success",
      "no-show": "outline",
    };
    return variants[status] || "outline";
  };

  if (sessions.length === 0) {
    return (
      <Card id="sessions-today">
        <CardHeader>
          <CardTitle>Today&apos;s Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No sessions scheduled for today
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="sessions-today">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Today&apos;s Sessions ({sessions.length})</CardTitle>
          <Link href="/my-schedule">
            <Button variant="ghost" size="sm">
              View All <IconChevronRight className="h-4 w-4 ml-1"/>
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">
                    {session.status === "available"
                      ? "Available Slot"
                      : session.studentName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {session.tutorName}
                  </p>
                </div>
                <Badge variant={getStatusBadge(session.status)}>
                  {session.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconClock className="h-4 w-4"/>
                  <span>{formatTime(session.startTime)}</span>
                  <span className="text-xs">({session.duration} min)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconMapPin className="h-4 w-4"/>
                  <span className="truncate">{session.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconUser className="h-4 w-4"/>
                  <span className="capitalize">{session.sessionType}</span>
                </div>
              </div>

              <div className="mt-3">
                <Link href="/my-schedule">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

