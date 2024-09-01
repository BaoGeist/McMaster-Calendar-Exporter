"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const supabase = supabaseBrowser();
  const [session, setSession] = useState<any>(undefined);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setSession(null); // Reset session state
    }
  };

  return <Button onClick={handleLogout}>Log out of Google</Button>;
};

export default LogoutButton;
