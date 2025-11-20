"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function QuizResult({ animal }: { animal: string }) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">You are a {animal}!</h2>
      <img
        src={imageMap[animal]}
        alt={animal}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={`I am a ${animal}! ${url}`} />
    </div>
  );
}
