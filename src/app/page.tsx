"use client";

import { Toaster } from "@/components/ui/toaster";
import { CourseProvider } from "./context/CourseContext";
import Homepage from "./HomePage";

const Page = () => {
  return (
    <CourseProvider>
      <Homepage />
      <a href="https://www.mac2cal.com/privacy">Privacy Policy</a>
      <Toaster />
    </CourseProvider>
  );
};
export default Page;
