import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default function Home() {
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
     <div className="max-w-5xl mx-auto text-center space-y-8 ">
      <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6  ">Your Space to Reflect. <br /> Your Story to Tell.</h1>
      <p className="text-lg md:text-xl text-orange-600 mb-8">
      Capture your thoughts, track your moods, and reflect on your journey
          in a beautiful, secure space.
      </p>
     </div>
    </div>
  );
}
