import { TCourse } from "../page";

export function generateBatchString(
  courses: TCourse[],
  authToken: string
): string {
  let batchString = "";
  const batchBoundary = "batch123456789876543";
  let batchCount = 0;

  // Helper function to format date and time
  const formatDateTime = (date: string, time: string) => {
    const [day, month, year] = date.split("/");

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

    return `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${hours.padStart(2, "0")}:${minutes}:00-04:00`;
  };

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

  for (const course of courses) {
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
      location: course.location,
      extendedProperties: {
        private: {
          owner: "McMaster University",
        },
      },
      start: {
        dateTime: startDateTime,
        timeZone: "America/New_York",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/New_York",
      },
      recurrence: [
        `RRULE:FREQ=WEEKLY;UNTIL=${course.endDate
          .split("/")
          .reverse()
          .join("")};BYDAY=${course.frequency.map(formatDay).join(",")}`,
        "EXDATE;TZID=America/New_York:20241230T173000,20241231T173000,20240101T173000,20240219T173000,20240220T173000,20240221T173000,20240222T173000,20240223T173000,20240329T173000,20240520T173000,20240701T173000,20240805T173000,20240902T173000,20241014T173000,20241015T173000,20241016T173000,20241017T173000,20241018T173000,20241225T173000,20241226T173000,20241227T173000,20221230T173000",
      ],
      reminders: {
        useDefault: false,
      },
      colorId: ((batchCount % 11) + 1).toString(), // Cycles through colorIds 1-11
    };

    batchString += JSON.stringify(eventData);
    batchString += "\n\n";

    batchCount++;
  }

  batchString += `--${batchBoundary}--`;

  console.log(batchString);

  return batchString;
}
