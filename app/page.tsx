import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-5 w-full min-h-screen">
      <div className="flex flex-col items-center border-2 rounded-4xl p-5 gap-5 mb-44">
        <h2 className="text-4xl font-black">Who is the impostor?</h2>
        <Link href="/game/theme" className="w-full">
          <Button className="w-full" size={"lg"}>
            Entrar com google
          </Button>
        </Link>
      </div>
    </div>
  );
}
