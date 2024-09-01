"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  setSession: (session: any) => void;
};

const LogoutButton = ({ setSession }: LogoutButtonProps) => {
  const supabase = supabaseBrowser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setSession(undefined); // Reset session state
    }
  };

  return <Button onClick={handleLogout}>Log out of Google</Button>;
};

export default LogoutButton;
