import { Toaster } from "sonner";
import WeddingWishes from "../components/wedding-wishes";

export default function Home() {
  return (
    <main>
      <WeddingWishes />
      <Toaster dir="rtl" position="bottom-right" />
      <div className="text-center my-10">
        <span className="text-[0.800rem] text-gold-dark">
          Made with ❤️ by Mohamed Fathy
        </span>
      </div>
    </main>
  );
}
