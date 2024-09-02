import { addDays, format, isValid, parse } from "date-fns";
import { TCourse } from "../HomePage";
import { setCourseTimes } from "./setCourseTimes";
import { toZonedTime, format as tzFormat } from 'date-fns-tz';

export function generateBatchString(
  courses: TCourse[],
  authToken: string,
  isNotificationsEnabled: boolean,
  inENCA: boolean
): string {
  const coursesFixed = setCourseTimes(courses, inENCA);
  let batchString = "";
  const batchBoundary = "batch123456789876543";
  let batchCount = 0;

  function convertDateAndAddDay(dateStr: string): string | null {
    // Define the input format and output format
    const inputFormat = inENCA ? "dd/MM/yyyy" : "MM/dd/yyyy";
    const outputFormat = "yyyyMMdd";

    // Parse the input date string
    const parsedDate = parse(dateStr, inputFormat, new Date());

    // Check if the parsed date is valid
    if (!isValid(parsedDate)) {
      console.error("Invalid date:", dateStr);
      return null; // Or handle the error as needed
    }

    // Add one day to the parsed date
    const newDate = addDays(parsedDate, 1);

    // Format the new date to the desired output format
    const formattedDate = format(newDate, outputFormat);

    return formattedDate;
  }

  // Helper function to format date and time
  const formatDateTime = (date: string, time: string) => {
    let day: string, month: string, year: string;
    const timeZone = 'America/New_York';
    
    if (inENCA) {
      // If inENCA is true, use "day/month/year" format
      [day, month, year] = date.split("/");
    } else {
      // If inENCA is false, use "month/day/year" format
      [month, day, year] = date.split("/");
    }

    // Check if time includes AM or PM
    const isPM = time.toUpperCase().includes("PM");
    const timeWithoutMeridiem = time.replace(/\s?[APap][Mm]/, "");

    let [hours, minutes] = timeWithoutMeridiem.split(":");

    // Convert to 24-hour format if necessary
    if (isPM && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    } else if (!isPM && hours === "12") {
      hours = "00";
    }

    const dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hours.padStart(2, "0")}:${minutes}:00`;
    
    // Convert the local time to UTC considering the specified time zone
    const zonedDate = toZonedTime(dateStr, timeZone);

    // Format the date to the required format with time zone offset
    return tzFormat(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
  };

  function parseTimeToString(timeString: string): string {
    const [time, period] = timeString.split(/([APM]{2})/);
    const [hours, minutes] = time.split(":").map(Number);
    let hours24 = hours;

    if (period === "PM" && hours < 12) {
      hours24 += 12;
    } else if (period === "AM" && hours === 12) {
      hours24 = 0;
    }
    return `${hours24.toString().padStart(2, "0")}${minutes
      .toString()
      .padStart(2, "0")}00`;
  }

  // Function to append time to each date string
  function appendTimeToDates(dateStr: string, startTime: string): string {
    const timeString = parseTimeToString(startTime);

    // Split the input dates by comma
    const dates = dateStr.split(",");

    // Append time to each date
    const formattedDates = dates.map((date) => {
      // Parse date and format with time
      const parsedDate = parse(date, "yyyyMMdd", new Date());
      if (!isValid(parsedDate)) {
        console.error("Invalid date:", date);
        return date;
      }
      return `${format(parsedDate, "yyyyMMdd")}T${timeString}`;
    });

    // Return the dates joined by commas
    return formattedDates.join(",");
  }

  // Helper function to format day abbreviations
  const formatDay = (day: string) => {
    const dayMap: { [key: string]: string } = {
      Mon: "MO",
      Tue: "TU",
      Wed: "WE",
      Thu: "TH",
      Fri: "FR",
      Sat: "SA",
      Sun: "SU",
    };
    return dayMap[day] || day;
  };

  function extractSectionCode(courseName: string) {
    // The regular expression looks for 'C', 'T', or 'L' followed by two digits
    const sectionCodeMatch = courseName.match(/\b[CTL]\d{2}\b/);

    // If a match is found, return it; otherwise, return null or a default value
    return sectionCodeMatch ? sectionCodeMatch[0] : null;
  }

  const getColorId = (courseType: string): number => {
    switch (courseType) {
      case "T":
        return 4;
      case "C":
        return 9;
      case "L":
        return 5;
      default:
        return 0; // Default colorId if courseType is not T, C, or L
    }
  };

  for (const course of coursesFixed) {
    batchString += `--${batchBoundary}\n`;
    batchString += "Content-Type: application/http\n";
    batchString += "Content-Transfer-Encoding: binary\n";
    batchString += `Content-ID: <${batchBoundary}+${
      Date.now() + batchCount
    }@googleapis.com>\n\n`;
    batchString +=
      "POST /calendar/v3/calendars/primary/events?sendNotifications=false&alt=json\n";
    batchString +=
      "X-JavaScript-User-Agent: google-api-javascript-client/1.1.0\n";
    batchString += "X-Requested-With: XMLHttpRequest\n";
    batchString += "Content-Type: application/json\n";
    batchString += "X-Goog-Encode-Response-If-Executable: base64\n";
    batchString += `Authorization: Bearer ${authToken}\n`;
    batchString += `X-ClientDetails: appVersion=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F128.0.0.0%20Safari%2F537.36&platform=Win32&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F128.0.0.0%20Safari%2F537.36\n\n`;

    const startDateTime = formatDateTime(course.startDate, course.startTime);
    const endDateTime = formatDateTime(course.startDate, course.endTime);

    const eventData = {
      summary: course.name,
      location: course.location.replace("_", " "),
      extendedProperties: {
        private: {
          owner: "McMaster University",
        },
      },
      start: {
        dateTime: startDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      recurrence: [
        `RRULE:FREQ=WEEKLY;UNTIL=${convertDateAndAddDay(
          course.endDate
        )};BYDAY=${course.frequency.map(formatDay).join(",")}`,
        `EXDATE;TZID=America/New_York:${appendTimeToDates(
          "20241230,20241231,20240101,20240219,20240220,20240221,20240222,20240223,20240329,20240520,20240701,20240805,20240902,20241014,20241015,20241016,20241017,20241018,20241225,20241226,20241227,20221230",
          course.startTime
        )}`,
      ],
      reminders: {
        useDefault: isNotificationsEnabled,
      },
      colorId: getColorId(extractSectionCode(course.name)![0]), // Cycles through colorIds 1-11
    };

    batchString += JSON.stringify(eventData);
    batchString += "\n\n";

    batchCount++;
  }

  batchString += `--${batchBoundary}--`;

  console.log(batchString);

  return batchString;
}
