import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { TCourse } from "../HomePage";

type TCourseContext = {
  courses: TCourse[];
  setCourses: (courses: TCourse[]) => void;
};

type Props = {
  children: ReactNode;
};

export const CourseContext = createContext<TCourseContext | undefined>(
  undefined
);

const firstTimeSlotOfTheDayUTC = 11;

export const CourseProvider = ({ children }: Props) => {
  const [courses, setCourses] = useState<TCourse[]>([]);

  return (
    <CourseContext.Provider value={{ courses, setCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
