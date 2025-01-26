import { Toaster } from "sonner";
import WeddingWishes from "../components/wedding-wishes";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main>
      <WeddingWishes />
      <Toaster dir="rtl" position="bottom-right" />
      <div className="flex justify-center text-center my-10">
        <span className="flex items-center gap-2 text-[0.700rem] text-gold-dark">
          Made with
          <Heart className="w-4 h-4 text-roseGold-600" fill="currentColor" />
          by Mohamed Fathy
        </span>
      </div>
    </main>
  );
}
