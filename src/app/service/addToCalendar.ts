export async function addToCalendar(
  authorizationHeader: string,
  calendar: string
): Promise<void> {
  // Logic to add the event to the calendar goes here
  // You can use a library or API to interact with the calendar service

  // Example code to add the event to a Google Calendar using the Google Calendar API
  const auth = "YOUR_AUTH_TOKEN";
  const calendarId = "primary";
  const url = `https://content.googleapis.com/batch/calendar/v3`;

  // const batchContent = [
  //   {
  //     method: "POST",
  //     path: `/calendar/v3/calendars/${calendarId}/events`,
  //     body: {
  //       summary: event.title,
  //       start: {
  //         dateTime: event.startTime.toISOString(),
  //         timeZone: "YOUR_TIME_ZONE",
  //       },
  //       end: {
  //         dateTime: event.endTime.toISOString(),
  //         timeZone: "YOUR_TIME_ZONE",
  //       },
  //     },
  //   },
  // ];

  try {
    //   const response = fetch(url, batchContent, {
    //     headers: {
    //       Authorization: `Bearer ${auth}`,
    //       "Content-Type": "multipart/mixed",
    //     },
    //   });

    console.log("Event added to calendar:");
  } catch (error) {
    console.error("Error adding event to calendar:", error);
  }
}
