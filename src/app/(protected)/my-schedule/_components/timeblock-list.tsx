"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconSearch,
  IconClock,
  IconMapPin,
  IconUser,
  IconCalendar,
} from "@tabler/icons-react";
import { SessionData } from "@/components/calendar/types";
import { getStudentInfo } from "@/actions/timeblocks";

interface TimeblockListProps {
  data: SessionData[];
}

export function TimeblockList({ data }: TimeblockListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sessionTypeFilter, setSessionTypeFilter] = useState("all");
  const [studentInfoCache, setStudentInfoCache] = useState<
    Record<string, { name: string | null; email: string; image: string }>
  >({});

  // Fetch student info for all unique student IDs
  useEffect(() => {
    const fetchStudentInfo = async () => {
      const uniqueStudentIds = [
        ...new Set(data.map((tb) => tb.studentId).filter((id) => id)),
      ];
      const cache: Record<
        string,
        { name: string | null; email: string; image: string }
      > = {};

      await Promise.all(
        uniqueStudentIds.map(async (studentId) => {
          try {
            const result = await getStudentInfo(studentId);
            if (result.status === 200 && result.user) {
              cache[studentId] = result.user;
            }
          } catch (error) {
            console.error(
              `Failed to fetch student info for ${studentId}:`,
              error
            );
          }
        })
      );

      setStudentInfoCache(cache);
    };

    if (data.length > 0) {
      fetchStudentInfo();
    }
  }, [data]);

  const filteredTimeblocks = useMemo(() => {
    return data.filter((timeblock) => {
      const student = timeblock.studentId
        ? studentInfoCache[timeblock.studentId]
        : null;
      const matchesSearch =
        !searchTerm ||
        student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        timeblock.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || timeblock.status === statusFilter;
      const matchesType =
        sessionTypeFilter === "all" ||
        timeblock.sessionType === sessionTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, studentInfoCache, searchTerm, statusFilter, sessionTypeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
      case "available":
        return "bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-slate-700";
      case "cancelled":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
      case "completed":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
      case "no-show":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-slate-500";
      case "available":
        return "bg-blue-500";
      case "cancelled":
        return "bg-slate-400";
      case "completed":
        return "bg-slate-400";
      case "no-show":
        return "bg-slate-400";
      default:
        return "bg-slate-500";
    }
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getStudentInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">
            Time Blocks
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your available teaching slots and bookings
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <Input
                  placeholder="Search by student name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sessionTypeFilter}
                onValueChange={setSessionTypeFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Blocks List */}
      <div className="space-y-4 overflow-y-auto flex-1 min-h-0 pr-2">
        {filteredTimeblocks.length === 0 ? (
          <Card className="border border-dashed border-border">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <IconClock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No time blocks found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm ||
                statusFilter !== "all" ||
                sessionTypeFilter !== "all"
                  ? "Try adjusting your filters to see more results"
                  : "Create your first time block to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTimeblocks.map((timeblock) => {
            const student = timeblock.studentId
              ? studentInfoCache[timeblock.studentId]
              : null;
            const isAvailable = timeblock.status === "available";
            const statusDot = getStatusDot(timeblock.status);

            return (
              <Card
                key={timeblock.id}
                className="group hover:shadow-md transition-all duration-200 border border-border overflow-hidden relative"
              >
                {/* Status Accent Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.5 ${statusDot}`}
                />

                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section - Avatar and Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        {student?.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-border relative">
                            <Image
                              src={student.image}
                              alt={student.name || "Student"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-medium text-sm border border-border">
                            {getStudentInitials(
                              student?.name ||
                                (isAvailable ? "Available" : "Unknown")
                            )}
                          </div>
                        )}
                        {/* Status indicator dot */}
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusDot} border-2 border-background`}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4 className="font-medium text-base text-foreground">
                            {student?.name ||
                              (isAvailable
                                ? "Available Slot"
                                : "Unknown Student")}
                          </h4>
                          <Badge
                            className={`${getStatusColor(
                              timeblock.status
                            )} border text-xs font-normal capitalize px-2 py-0.5`}
                          >
                            {timeblock.status}
                          </Badge>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IconCalendar className="h-4 w-4" />
                            <div>
                              <div className="font-medium text-foreground">
                                {formatDate(timeblock.startTime)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatTime(timeblock.startTime)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IconMapPin className="h-4 w-4" />
                            <span className="font-medium text-foreground">
                              {timeblock.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IconUser className="h-4 w-4" />
                            <span className="font-medium text-foreground capitalize">
                              {timeblock.sessionType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Duration and Actions */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconClock className="h-4 w-4" />
                        <span className="font-medium">
                          {timeblock.duration} min
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={isAvailable ? "default" : "outline"}
                      >
                        {isAvailable ? "Book" : "Edit"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
