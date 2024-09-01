"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";
import { handleAddToCalendar } from "./lib/handleAddToCalendar";
import { TCourse } from "./page";

type CalendarButtonProps = {
  courses: TCourse[];
  authToken: string;
  className?: string;
};

const CalendarButton = ({
  courses,
  authToken,
  className,
}: CalendarButtonProps) => {
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
