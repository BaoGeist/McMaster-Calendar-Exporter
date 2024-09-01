"use client";

import { CourseProvider } from "./context/CourseContext";
import Homepage from "./HomePage";

const Page = () => {
  return (
    <CourseProvider>
      <Homepage />
      <a href="https://www.mac2cal.com/privacy">Privacy Policy</a>
    </CourseProvider>
  );
};
export default Page;
