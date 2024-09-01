"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";
import { handleAddToCalendar } from "./lib/handleAddToCalendar";
import { TCourse } from "./HomePage";
import { useCourseContext } from "./context/CourseContext";

type CalendarButtonProps = {
  authToken: string;
  className?: string;
};

const CalendarButton = ({ authToken, className }: CalendarButtonProps) => {
  const { courses } = useCourseContext();

  return (
    <Button
      onClick={() => handleAddToCalendar(authToken, "123", courses)}
      className={className ?? ""}
    >
      Log into Google
    </Button>
  );
};

export default CalendarButton;
