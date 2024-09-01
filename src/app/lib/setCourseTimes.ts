import {
  Day,
  format,
  getDay,
  isValid,
  nextDay,
  setHours,
  setMinutes,
} from "date-fns";

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

function parseTime(timeString: string): Date {
  const [time, period] = timeString.split(/([APM]{2})/);
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(period === "PM" && hours < 12 ? hours + 12 : hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
}

function formatTime(date: Date): string {
  if (!isValid(date)) {
    console.error("Invalid Date for formatting:", date);
    return "";
  }
  return format(date, "h:mma");
}

function parseDateString(dateString: string, inENCA: boolean): Date {
  let day: number, month: number, year: number;

  if (inENCA) {
    // If inENCA is true, use "day/month/year" format
    [day, month, year] = dateString.split("/").map(Number);
  } else {
    // If inENCA is false, use "month/day/year" format
    [month, day, year] = dateString.split("/").map(Number);
  }
  return new Date(year, month - 1, day);
}

export function setCourseTimes(courses: TCourse[], inENCA: boolean): TCourse[] {
  const dayMapping: { [key: string]: number } = {
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 0,
  };

  const courseMap: { [name: string]: TCourse[] } = {};

  // Group courses by name
  courses.forEach((course) => {
    if (!courseMap[course.name]) {
      courseMap[course.name] = [];
    }
    courseMap[course.name].push({ ...course }); // Create a copy of each course
  });

  const updatedCourses: TCourse[] = [];

  for (const courseGroup of Object.values(courseMap)) {
    courseGroup.forEach((course) => {
      const updatedCourse: TCourse = {
        ...course,
        isPotentiallyIrregular: courseGroup.length > 1,
      };

      let earliestStartDate: Date | null = null;

      updatedCourse.frequency.forEach((day) => {
        const dayNumber = dayMapping[day.toUpperCase()]; // Get the day number
        const startDate = parseDateString(updatedCourse.startDate, inENCA);

        // Ensure valid date objects
        if (!isValid(startDate)) {
          console.error("Invalid date:", updatedCourse.startDate);
          return;
        }

        // Check the weekday of the startDate
        const startDayOfWeek = getDay(startDate);

        // Calculate new start date
        const newStartDate =
          startDayOfWeek === dayNumber
            ? startDate
            : nextDay(startDate, dayNumber as Day);

        // Update startDate if it's earlier than the previously found date
        if (!earliestStartDate || newStartDate < earliestStartDate) {
          earliestStartDate = newStartDate;
        }
      });

      // Format the earliest start date
      if (earliestStartDate) {
        updatedCourse.startDate = format(earliestStartDate, "dd/MM/yyyy");
      }

      updatedCourses.push(updatedCourse);
    });
  }

  return updatedCourses;
}
