import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/game");
  }

  return (
    <div className="flex items-center justify-center p-5 w-full min-h-screen">
      <div className="flex flex-col items-center border-2 rounded-4xl p-5 gap-5 mb-44">
        <h2 className="text-4xl font-black">Who is the impostor?</h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
