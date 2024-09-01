"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Session, User } from "@supabase/supabase-js";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CalendarButton from "./CalendarButton";
import { supabaseBrowser } from "./lib/browser";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useCourseContext } from "./context/CourseContext";
import { Toggle } from "../components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import CoursesTable from "./CoursesTable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type TCourse = {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  frequency: string[];
  location: string;
  export: boolean;
  isPotentiallyIrregular?: boolean;
};

const Homepage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [text, setText] = useState("");
  const { courses, setCourses } = useCourseContext();
  const [isCA, setIsCA] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const handleToggle = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  useEffect(() => {
    const parseCoursesData = (data: string) => {
      if (!data) return;
      const lines = data.trim().split("\n");

      if (lines.length % 8 !== 0) {
        console.error("Invalid input: Number of lines is not a multiple of 8");
        return;
      }
      const newCourses: TCourse[] = [];

      for (let i = 0; i < lines.length; i += 8) {
        const [
          name,
          startDate,
          startTime,
          endTime,
          endDate,
          frequency,
          location,
          exportStr,
        ] = lines.slice(i, i + 8);

        const course: TCourse = {
          name: name.trim(),
          startDate: startDate.trim(),
          endDate: endDate.trim(),
          startTime: startTime.trim(),
          endTime: endTime.trim(),
          frequency: frequency.trim().split(" "),
          location: location.trim(),
          export: exportStr.trim().toLowerCase() === "true", // Adjust based on how exportStr is expected
        };

        newCourses.push(course);
      }

      setCourses(newCourses);
    };

    parseCoursesData(text);
  }, [text]);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = supabaseBrowser();

      // Wait for Supabase to process the OAuth redirect and store the session
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      } else {
        setUser(session?.session?.user);
        setSession(session?.session ?? undefined);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <main className="mt-16 max-w-[1000px] mx-4 mb-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-primary">McMaster</span> Schedule{" "}
          <span className="text-xl text-primary">2</span> Google Calendar
        </h1>

        <p className="text-lg mt-4">
          Copying your course schedule to Google Calendar through the Reddit
          link is broken. Not sure when theyre going to fix it but this is an
          alternative until that works again. If you are having issues, sign out
          and sign back in again.
          <br />
          <br />
          P.s. This app is still getting approved so you will get a warning when
          signing in with Google. You can continue by clicking advanced and
          continuing with Google. You could also wait until the app is approved,
          or check out the{" "}
          <Link
            target="_blank"
            className="text-primary hover:underline"
            href="https://github.com/BaoGeist/McMaster-Calendar-Exporter"
          >
            code here
          </Link>{" "}
          if you are still unsure.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 1: Allow Google Calendar Access</CardTitle>
            <CardDescription>
              Sign into google calendar and press "allow"
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="flex gap-3">
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                  height={50}
                  width={50}
                  className="rounded-md"
                />

                <div>
                  <p>{user.user_metadata.full_name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            ) : (
              <LoginButton />
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 2: Toggle Notifications</CardTitle>
            <CardDescription>
              Select if you want each calendar event to include a reminder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={isNotificationsEnabled}
                onCheckedChange={handleToggle}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 3: Copy & Paste Courses</CardTitle>
            <CardDescription>
              Go to the{" "}
              <Button variant="link" className="p-0 h-fit">
                <Link
                  target="_blank"
                  href="https://csprd.mcmaster.ca/psp/prcsprd/EMPLOYEE/EPM/c/MCM_CUSTOM_MENU.MCM_TIMETBL_CMP.GBL"
                >
                  original mosaic export page
                </Link>
              </Button>{" "}
              and copy and paste your courses below. Highlight your courses
              starting from the first cell in the top right corner all the way
              to the bottom right corner as shown in the{" "}
              <Modal
                title="Example Highlight"
                className="w-[1200px]"
                trigger={
                  <Button variant="link" className="inline p-0 h-fit">
                    picture here
                  </Button>
                }
              >
                <div className="">
                  <Image
                    src="/assets/example.png"
                    alt="Example of how to highlight your courses"
                    width={1416}
                    height={338}
                  />
                </div>
              </Modal>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="mb-2">Which format are your dates in?</p>
              <RadioGroup
                defaultValue="en-ca"
                onValueChange={(val) => {
                  setIsCA(val === "en-ca");
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en-ca" id="en-ca" />
                  <Label className="cursor-pointer" htmlFor="en-ca">
                    DD/MM/YYYY
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en-us" id="en-us" />
                  <Label className="cursor-pointer" htmlFor="en-us">
                    MM/DD/YYYY
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Textarea
              className="h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              Step 4: Confirm and copy your schedule to Google Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CoursesTable />
            <CalendarButton
              authToken={session?.provider_token ?? ""}
              isNotificationsEnabled={isNotificationsEnabled}
              className="text-wrap"
              isCA={isCA}
            />
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 5: Sign out of Google Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <LogoutButton setSession={setUser} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Homepage;
