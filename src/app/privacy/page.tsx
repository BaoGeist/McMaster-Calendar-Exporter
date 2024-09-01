import React from "react";

function PrivacyPolicy() {
  return (
    <div className="m-auto w-[80%] mt-5">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-lg text-gray-700">
        mac2cal is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, and share information when you use our
        app.
      </p>
      <h2 className="text-2xl font-semibold  mt-6">Information We Collect</h2>
      <p className="text-lg text-gray-700">
        <span className="font-bold">Google Account Information:</span> When you
        sign in to our app using your Google account, we may access your basic
        account information, such as your name and email address. This
        information is not stored by our app.
        <br />
        <span className="font-bold">Calendar Data:</span> If you grant our app
        permission to access your Google Calendar, we will collect the calendar
        events you have created or shared with us. This data is not stored by
        our app.
      </p>
      <h2 className="text-2xl font-semibold  mt-6">
        How We Use Your Information
      </h2>
      <p className="text-lg text-gray-700">
        <li className="list-disc ml-4">
          Access Calendar Events: We use the information you provide to access
          and manage your calendar events through the Google Calendar API.
        </li>
        <li className="list-disc ml-4">
          No Data Storage: We do not store any of your personal information,
          including your Google account information or calendar data.
        </li>
      </p>
      <h2 className="text-2xl font-semibold  mt-6">Sharing Your Information</h2>
      <p className="text-lg text-gray-700">
        <li className="list-disc ml-4">
          Google Calendar API: We share your calendar data with Google's
          Calendar API to perform the requested actions. Google's privacy
          practices can be found at
          https://support.google.com/calendar/answer/10366125?hl=en
        </li>
      </p>
      <h2 className="text-2xl font-semibold  mt-6">Your Rights</h2>
      <p className="text-lg text-gray-700">
        As our app does not store any of your personal information, you do not
        have any specific rights related to data access, rectification, erasure,
        restriction, or objection. However, you can manage your Google account
        settings and permissions to control the information shared with our app.
      </p>
      <h2 className="text-2xl font-semibold  mt-6">
        Changes to This Privacy Policy
      </h2>
      <p className="text-lg text-gray-700">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the updated Privacy Policy on our website.
      </p>
      <h2 className="text-2xl font-semibold  mt-6">Contact Us</h2>
      <p className="text-lg text-gray-700">
        If you have any questions about this Privacy Policy or our practices,
        please contact us at baozlego@gmail.com.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
