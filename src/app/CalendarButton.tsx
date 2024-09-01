"use client";

import { Button } from "@/components/ui/button";
import { useCourseContext } from "./context/CourseContext";
import { handleAddToCalendar } from "./lib/handleAddToCalendar";

type CalendarButtonProps = {
  authToken: string;
  isNotificationsEnabled: boolean;
  className?: string;
};

const CalendarButton = ({
  authToken,
  isNotificationsEnabled,
  className,
}: CalendarButtonProps) => {
  const { courses } = useCourseContext();

  return (
    <Button
      onClick={() =>
        handleAddToCalendar(authToken, "123", courses, isNotificationsEnabled)
      }
      className={className ?? ""}
    >
      Copy your schedule to Google Calendar
    </Button>
  );
};

export default CalendarButton;
