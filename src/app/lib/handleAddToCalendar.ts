// import { getBatchString } from "./getBatchString";

import { TCourse } from "../HomePage";
import { generateBatchString } from "./generateBatchString";

export async function handleAddToCalendar(
  authToken: string,
  batchBoundary: string,
  courses: TCourse[],
  isNotificationsEnabled: boolean,
  inENCA: boolean,
  calendarId: string = "primary",
) {
  const boundary =
    batchBoundary ||
    `batch_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": `multipart/mixed; boundary=${boundary}`,
      "Accept-Encoding": "gzip, deflate, br",
      Accept: "application/json",
      Connection: "keep-alive",
    },
    body: await generateBatchString(
      courses,
      authToken,
      isNotificationsEnabled,
      inENCA,
      calendarId,
      boundary,
    ),
  };

  try {
    const response = await fetch(
      "https://content.googleapis.com/batch/calendar/v3",
      fetchOptions,
    );

    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      // If the response is not okay, log the status and status text
      console.error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
      const text = await response.text();
      console.error("Error response body:", text);
      return;
    }

    // Check if the response is JSON
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("data from adding: ", data);
    } else {
      const text = await response.text();
      console.log("Response text:", text);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
