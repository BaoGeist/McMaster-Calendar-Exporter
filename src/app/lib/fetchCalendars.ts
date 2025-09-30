export interface GoogleCalendar {
  id: string;
  summary: string;
  primary?: boolean;
  backgroundColor?: string;
  accessRole: string;
}

export async function fetchCalendars(
  authToken: string
): Promise<GoogleCalendar[]> {
  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch calendars: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter to only show calendars where the user has write access
    const writableCalendars = data.items.filter(
      (cal: GoogleCalendar) =>
        cal.accessRole === "owner" || cal.accessRole === "writer"
    );

    return writableCalendars;
  } catch (error) {
    console.error("Error fetching calendars:", error);
    throw error;
  }
}
