import React from "react";
import { supabaseBrowser } from "./lib/browser";

const LoginButton = () => {
  const handleLogin = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({ provider: "google", options });
  };

  return <div></div>;
};

export default LoginButton;
