"use client";

import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/app/actions/auth/login-with-google";

export function GoogleLoginButton() {
  const handleLogin = async () => {
    const { data, error } = await loginWithGoogle();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Button onClick={handleLogin} className="w-full" size="lg">
      Entrar com google
    </Button>
  );
}
