"use state";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [calendarInfo, setCalendarInfo] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/createcalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ calendarInfo }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Calendar created:", result);
        // Handle success (e.g., show a success message)
      } else {
        console.error("Failed to create calendar");
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Calendar</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter calendar information here..."
          value={calendarInfo}
          onChange={(e) => setCalendarInfo(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Create Calendar
        </button>
      </div>
    </main>
  );
}
