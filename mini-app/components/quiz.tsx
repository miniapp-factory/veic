"use client";

import { useState, useEffect } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";
import QuizResult from "./quiz-result";

type Option = {
  text: string;
  animal: string;
};

type Question = {
  question: string;
  options: Option[];
};

const questions: Question[] = [
  {
    question: "What’s your favorite type of food?",
    options: [
      { text: "Meat", animal: "dog" },
      { text: "Fish", animal: "cat" },
      { text: "Plants", animal: "hamster" },
      { text: "Grains", animal: "horse" },
      { text: "Berries", animal: "fox" },
    ],
  },
  {
    question: "How do you prefer to spend a weekend?",
    options: [
      { text: "Running around", animal: "fox" },
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Grazing", animal: "horse" },
      { text: "Nibbling snacks", animal: "hamster" },
    ],
  },
  {
    question: "What’s your personality like?",
    options: [
      { text: "Curious", animal: "fox" },
      { text: "Loyal", animal: "dog" },
      { text: "Independent", animal: "cat" },
      { text: "Gentle", animal: "horse" },
      { text: "Playful", animal: "hamster" },
    ],
  },
  {
    question: "Which environment do you thrive in?",
    options: [
      { text: "Open fields", animal: "horse" },
      { text: "Urban streets", animal: "dog" },
      { text: "Quiet corners", animal: "cat" },
      { text: "Dense forests", animal: "fox" },
      { text: "Small cages", animal: "hamster" },
    ],
  },
  {
    question: "What’s your favorite activity?",
    options: [
      { text: "Chasing tails", animal: "dog" },
      { text: "Climbing trees", animal: "fox" },
      { text: "Purring", animal: "cat" },
      { text: "Running fast", animal: "horse" },
      { text: "Nibbling", animal: "hamster" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[][]>([]);

  useEffect(() => {
    setShuffledOptions(questions.map(q => shuffleArray(q.options)));
  }, []);

  const handleSelect = (animal: string) => {
    setAnswers(prev => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      answers.concat(animal).forEach(a => {
        counts[a] = (counts[a] || 0) + 1;
      });
      const maxAnimal = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      setResult(maxAnimal);
    }
  };

  if (result) {
    return <QuizResult animal={result} />;
  }

  const q = questions[current];
  const opts = shuffledOptions[current] || [];

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {opts.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleSelect(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
