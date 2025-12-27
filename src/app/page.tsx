"use client";

import { Toaster } from "@/components/ui/toaster";
import { CourseProvider } from "./context/CourseContext";
import Homepage from "./HomePage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Page = () => {
  return (
    <CourseProvider>
      <div className="flex flex-col min-h-screen">
        <Homepage />
        <div className="flex gap-2 justify-center mb-4 mt-auto">
          <Button variant="secondary">
            <Link
              target="_blank"
              className="flex"
              href={"https://github.com/BaoGeist/McMaster-Calendar-Exporter"}
            >
              <Github size={18} className="mr" />
            </Link>
          </Button>
          <Button variant="secondary">
            <Link href="https://www.mac2cal.com/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
      <Toaster />
    </CourseProvider>
  );
};
export default Page;
