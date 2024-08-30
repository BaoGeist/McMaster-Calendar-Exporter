"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { User } from "@supabase/supabase-js";
import LogoutButton from "./LogoutButton";
import { Textarea } from "@/components/ui/textarea";

type TCourse = {
  name: string;
  startData: string;
  endDate: string;
  startTime: string;
  endTime: string;
  frequency: string[];
  location: string;
  export: boolean;
};

const Homepage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [text, setText] = useState("");
  const [courses, setCourses] = useState("");

  useEffect(() => {}, [text]);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = supabaseBrowser();

      // Wait for Supabase to process the OAuth redirect and store the session
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log(session);
        setUser(session?.session?.user);
      }
    };

    checkSession();
  }, []);

  console.log(user);
  console.log(text);

  return (
    <div className="flex flex-col items-center">
      <main className="mt-16 w-[1000px] mb-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-primary">McMaster</span> Schedule{" "}
          <span className="text-xl text-primary">2</span> Google Calendar
        </h1>

        <p className="text-lg mt-4">
          Copying your course schedule to Google Calendar through the Reddit
          link is broken. Not sure when theyre going to fix it but this is an
          alternative until that works again.
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
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 3: Copy Paste Courses</CardTitle>
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
              Step 4: Confirm and copy your schedule to Google calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Step 5: Sign out of google calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <LogoutButton></LogoutButton>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Homepage;
