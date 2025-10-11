"use client";

import { Button } from "@/components/ui/button";
import { useCourseContext } from "./context/CourseContext";
import { handleAddToCalendar } from "./lib/handleAddToCalendar";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCalendars, GoogleCalendar } from "./lib/fetchCalendars";
import { Label } from "@/components/ui/label";

type CalendarButtonProps = {
  authToken: string;
  isNotificationsEnabled: boolean;
  isCA: boolean;
  className?: string;
};

const CalendarButton = ({
  authToken,
  isNotificationsEnabled,
  isCA,
  className,
}: CalendarButtonProps) => {
  const { courses } = useCourseContext();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<string>("primary");
  const [isLoadingCalendars, setIsLoadingCalendars] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCalendars = async () => {
      try {
        const userCalendars = await fetchCalendars(authToken);
        setCalendars(userCalendars);

        // Set primary calendar as default if it exists
        const primaryCal = userCalendars.find((cal) => cal.primary);
        if (primaryCal) {
          setSelectedCalendar(primaryCal.id);
        }
      } catch (error) {
        // Silently handle error - may see 401s but fetch often succeeds on retry
        console.log("Could not fetch calendar list:", error);
        // Fallback to primary calendar
        setCalendars([
          { id: "primary", summary: "Primary Calendar", accessRole: "owner", primary: true }
        ]);
      } finally {
        setIsLoadingCalendars(false);
      }
    };

    loadCalendars();
  }, [authToken]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="calendar-select">Select Calendar</Label>
        <Select
          value={selectedCalendar}
          onValueChange={setSelectedCalendar}
          disabled={isLoadingCalendars || isClicked}
        >
          <SelectTrigger id="calendar-select" className="w-full">
            <SelectValue placeholder="Select a calendar" />
          </SelectTrigger>
          <SelectContent>
            {calendars.map((calendar) => (
              <SelectItem key={calendar.id} value={calendar.id}>
                {calendar.summary}
                {calendar.primary && " (Primary)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={async () => {
          try {
            await handleAddToCalendar(
              authToken,
              "123",
              courses,
              isNotificationsEnabled,
              isCA,
              selectedCalendar
            );

            // Increment the import counter
            await fetch('/api/stats/increment', {
              method: 'POST',
            });

            setIsClicked(true);
            toast({
              title: "Schedule copied",
              description: `Your schedule has been copied to ${
                calendars.find((c) => c.id === selectedCalendar)?.summary ||
                "your calendar"
              }`,
            });
          } catch (error) {
            console.error('Error adding to calendar:', error);
            toast({
              title: "Error",
              description: "Failed to copy schedule to calendar",
              variant: "destructive",
            });
          }
        }}
        className={className ?? ""}
        disabled={isClicked || isLoadingCalendars}
      >
        {isLoadingCalendars
          ? "Loading calendars..."
          : "Copy your schedule to Google Calendar"}
      </Button>
    </div>
  );
};

export default CalendarButton;
