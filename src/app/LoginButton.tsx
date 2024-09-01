"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  className?: string;
};

const LoginButton = ({ className }: LoginButtonProps) => {
  const supabase = supabaseBrowser();
  const [session, setSession] = useState<any>(undefined);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });

    console.log(supabase.auth.getSession());
    setSession(supabase.auth.getSession());
  };

  return (
    <Button onClick={handleLogin} className={className ?? ""}>
      Log into Google
    </Button>
  );
};

export default LoginButton;
