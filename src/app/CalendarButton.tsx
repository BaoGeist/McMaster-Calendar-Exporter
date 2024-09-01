"use client";

import { Button } from "@/components/ui/button";
import { useCourseContext } from "./context/CourseContext";
import { handleAddToCalendar } from "./lib/handleAddToCalendar";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        handleAddToCalendar(authToken, "123", courses, isNotificationsEnabled);
        setIsClicked(true);
        toast({
          title: "Schedule copied",
          description: "Your schedule has been copied to Google Calendar",
        });
      }}
      className={className ?? ""}
      disabled={isClicked}
    >
      Copy your schedule to Google Calendar
    </Button>
  );
};

export default CalendarButton;
