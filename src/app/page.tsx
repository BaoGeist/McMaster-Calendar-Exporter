"use client";

import { CourseProvider } from "./context/CourseContext";
import Homepage from "./HomePage";

const Page = () => {
  return (
    <CourseProvider>
      <Homepage />
    </CourseProvider>
  );
};
export default Page;
