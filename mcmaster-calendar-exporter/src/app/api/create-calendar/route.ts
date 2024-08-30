import { addToCalendar } from "@/app/service/addToCalendar";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the request body
    const calendar = req.body;
    // Get the authorization header
    const authorizationHeader = req.headers.authorization;

    if (!calendar || !authorizationHeader) {
      // Return an error if the request body or authorization header is missing
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Call your service here
    const result = await addToCalendar(authorizationHeader, calendar);

    // Return the result as JSON response
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors that occur during the service call
    res.status(500).json({ error: "An error occurred" });
  }
}
