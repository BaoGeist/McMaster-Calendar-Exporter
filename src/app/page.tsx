"use client";

import { Toaster } from "@/components/ui/toaster";
import { CourseProvider } from "./context/CourseContext";
import Homepage from "./HomePage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <CourseProvider>
      <Homepage />
      <Button variant="link" className="block mx-auto">
        <Link href="https://www.mac2cal.com/privacy">Privacy Policy</Link>
      </Button>
      <Toaster />
    </CourseProvider>
  );
};
export default Page;
