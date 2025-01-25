export function FloralCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const baseClasses = "absolute w-40 h-40 pointer-events-none opacity-80";
  const positionClasses = {
    "top-left": "-top-6 -left-6 rotate-0",
    "top-right": "-top-6 -right-6 rotate-90",
    "bottom-left": "-bottom-6 -left-6 -rotate-90",
    "bottom-right": "-bottom-6 -right-6 rotate-180",
  };

  return (
    <div className={`${baseClasses} ${positionClasses[position]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {/* Main stem */}
          <path d="M50,10 Q60,30 70,20 T90,30" className="text-gold-light" />
          {/* Flower */}
          <circle cx="90" cy="30" r="8" className="fill-roseGold-300" />
          {/* Leaves */}
          <path
            d="M55,15 Q65,10 70,20"
            className="text-gold-dark fill-gold-light/30"
          />
          <path
            d="M65,25 Q75,20 80,30"
            className="text-gold-dark fill-gold-light/30"
          />
          {/* Small decorative elements */}
          <circle cx="45" cy="18" r="2" className="fill-gold-light" />
          <circle cx="75" cy="15" r="1.5" className="fill-roseGold-200" />
        </g>
      </svg>
    </div>
  );
}
