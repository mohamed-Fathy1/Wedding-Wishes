// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AudioRecorder } from "./audio-recorder";
// import { ImageUpload } from "./image-upload";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Heart } from "lucide-react";
// import { FloralCorner } from "./floral-corner";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { messageService } from "@/services/messageService";
// import { BirdMessage } from "./icons/bird-message";
// import Image from "next/image";

// // Add this new component for the envelope lines
// function EnvelopeLines() {
//   return (
//     <>
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Left triangle */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.1 }}
//           transition={{ delay: 0.8 }}
//           className="absolute top-0 left-0 w-1/2 h-full bg-gold-light"
//           style={{
//             clipPath: "polygon(0 0, 100% 50%, 0 100%)",
//           }}
//         />
//         {/* Right triangle */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.1 }}
//           transition={{ delay: 0.8 }}
//           className="absolute top-0 right-0 w-1/2 h-full bg-gold-light"
//           style={{
//             clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
//           }}
//         />
//         {/* <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.1 }}
//           transition={{ delay: 0.8 }}
//           className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold-dark"
//           style={{
//             clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
//           }}
//         /> */}
//       </div>
//     </>
//   );
// }

// function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay, duration: 0.5 }}
//       className="inline-block"
//     >
//       {text.split("").map((char, index) => (
//         <motion.span
//           key={index}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             transition: {
//               delay: delay + index * 0.1,
//               duration: 0.3,
//               ease: [0.2, 0.65, 0.3, 0.9],
//             },
//           }}
//           className="inline-block relative"
//         >
//           <motion.span
//             initial={{ width: "0%" }}
//             animate={{ width: "100%" }}
//             transition={{
//               delay: delay + index * 0.1,
//               duration: 0.2,
//               ease: "easeOut",
//             }}
//             className="absolute bottom-0 left-0 h-[1.5px] bg-gold-light/30"
//             style={{
//               originX: 0,
//             }}
//           />
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// }

// function IntroSequence({ onComplete }: { onComplete: () => void }) {
//   return (
//     <motion.div
//       className="min-h-[80vh] flex flex-col items-center justify-center relative"
//       initial="initial"
//       animate="animate"
//     >
//       <div className="text-center space-y-8">
//         {/* Bird Icon */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="mb-12"
//         >
//           <motion.div
//             animate={{ y: [-10, 10, -10] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <div className="relative">
//               <BirdMessage className="w-16 h-16 text-gold-dark" />
//               <motion.div
//                 animate={{
//                   y: [-4, 4, -4],
//                   x: [-2, 2, -2],
//                 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 4,
//                   ease: "easeInOut",
//                 }}
//                 className="absolute -top-3 -right-2"
//               >
//                 <Heart
//                   className="w-4 h-4 text-roseGold-400"
//                   fill="currentColor"
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Main Content */}
//         <div className="relative px-4">
//           {/* Text Content */}
//           <div className="py-8 space-y-6">
//             <div className="h-8 font-cormorant">
//               <AnimatedText text="The Wedding of" delay={0.8} />
//             </div>

//             <div className="font-dancing text-5xl md:text-7xl text-gold-dark flex flex-col md:flex-row items-center justify-center gap-4 h-auto md:h-24">
//               <AnimatedText text="Marawan" delay={1.2} />
//               <motion.span
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 2.3, duration: 0.5 }}
//                 className="text-roseGold-400"
//               >
//                 &
//               </motion.span>
//               <AnimatedText text="Rawda" delay={2.5} />
//             </div>
//           </div>

//           {/* Decorative Lines */}
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ delay: 3.2, duration: 1, ease: "easeInOut" }}
//             className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-light to-transparent"
//             style={{ transformOrigin: "center" }}
//           />
//         </div>

//         {/* Decorative Hearts */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0, duration: 0.8 }}
//           className="absolute inset-0 pointer-events-none"
//         >
//           <motion.div
//             animate={{ rotate: [0, 10, -10, 0] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//             className="absolute top-10 left-10"
//           >
//             <Heart className="w-6 h-6 text-gold-light/20" fill="currentColor" />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: [0, -10, 10, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-20 right-10"
//           >
//             <Heart
//               className="w-4 h-4 text-roseGold-400/20"
//               fill="currentColor"
//             />
//           </motion.div>

//           <motion.div
//             animate={{ rotate: [0, -10, 10, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-30 left-10"
//           >
//             <Heart className="w-4 h-4 text-roseGold-400" fill="currentColor" />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: [0, -10, 10, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-1/4 left-9"
//           >
//             <Heart className="w-4 h-4 text-roseGold-400" fill="currentColor" />
//           </motion.div>
//         </motion.div>

//         <div className="flex flex-col">
//           {/* Final Text */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 3.8, duration: 0.8 }}
//             className="font-cormorant text-xl text-gold-dark/80 italic pt-4"
//           >
//             Share your wishes with us...
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 3.8, duration: 0.8 }}
//             className="w-full flex justify-center"
//           >
//             <Image
//               src="/rb_20359.png"
//               alt="widding img"
//               width={500}
//               height={500}
//               className="w-36 [filter:sepia(100%)_saturate(150%)_brightness(70%)_hue-rotate(350deg)]"
//             ></Image>
//           </motion.p>
//         </div>

//         {/* Sparkle Effects */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{
//             delay: 4,
//             duration: 2,
//             repeat: Infinity,
//             repeatDelay: 3,
//           }}
//           className="absolute inset-0 pointer-events-none"
//         >
//           <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-light rounded-full" />
//           <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-roseGold-400 rounded-full" />
//           <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold-light rounded-full" />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{
//             delay: 4,
//             duration: 2,
//             repeat: Infinity,
//             repeatDelay: 3,
//           }}
//           className="absolute inset-0 pointer-events-none"
//         >
//           <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold-light rounded-full" />
//           <div className="absolute bottom-3/4 left-1/3 w-1 h-1 bg-roseGold-400 rounded-full" />
//           <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-light rounded-full" />
//         </motion.div>
//       </div>

//       {/* Trigger form display after animations */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0 }}
//         transition={{ delay: 5.5 }} // Increased delay
//         onAnimationComplete={onComplete}
//       />
//     </motion.div>
//   );
// }

// export default function WeddingWishes() {
//   const [showForm, setShowForm] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [voiceFile, setVoiceFile] = useState<File | null>(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Scroll to top when showForm or isSubmitted changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [showForm, isSubmitted]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       await messageService.sendMessage(
//         message,
//         imageFile || undefined,
//         voiceFile || undefined
//       );

//       // Show success state
//       setIsSubmitted(true);

//       // Reset form
//       setMessage("");
//       setImageFile(null);
//       setVoiceFile(null);
//     } catch (err) {
//       setError("There was an error submitting your wishes. Please try again.");
//       console.error("Error submitting wishes:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleAudioRecordingComplete = (blob: Blob) => {
//     // Convert blob to File
//     const file = new File([blob], `voice-${Date.now()}.webm`, {
//       type: "audio/webm",
//     });
//     setVoiceFile(file);
//   };

//   const handleImageSelect = (file: File) => {
//     setImageFile(file);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-cream to-white p-4 md:p-8">
//       <AnimatePresence mode="wait">
//         {!showForm ? (
//           <motion.div
//             key="intro"
//             exit={{ opacity: 0, y: 20 }}
//             className="container mx-auto"
//           >
//             <IntroSequence
//               onComplete={() => setTimeout(() => setShowForm(true), 1000)}
//             />
//           </motion.div>
//         ) : !isSubmitted ? (
//           <motion.div
//             key="form"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, x: "-100%" }}
//             transition={{ duration: 0.5 }}
//             className="max-w-2xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-12 md:p-16 border border-gold-light/20"
//           >
//             <FloralCorner position="top-left" />
//             <FloralCorner position="top-right" />
//             <FloralCorner position="bottom-left" />
//             <FloralCorner position="bottom-right" />

//             <motion.p
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0, duration: 0.8 }}
//               className="absolute w-36 -left-12 top-[10%] [filter:sepia(100%)_saturate(250%)_brightness(80%)_hue-rotate(350deg)]"
//             >
//               <Image
//                 src="/rb_20352.png"
//                 alt="widding img"
//                 width={500}
//                 height={500}
//                 className="w-36 rotate-90"
//               ></Image>
//             </motion.p>

//             <motion.p
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="absolute w-36 -right-14 bottom-[20%] [filter:sepia(100%)_saturate(180%)_brightness(70%)_hue-rotate(350deg)]"
//             >
//               <Image
//                 src="/rb_1017.png"
//                 alt="widding img"
//                 width={500}
//                 height={500}
//                 className="w-36"
//                 style={{
//                   transform: "rotateY(180deg) rotateZ(50deg)",
//                 }}
//               ></Image>
//             </motion.p>

//             <div className="text-center mb-12 relative">
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-gold-dark font-cinzel uppercase tracking-[0.2em] text-sm mb-4"
//               >
//                 Share Your Love
//               </motion.p>
//               <motion.h1
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-4xl md:text-5xl flex flex-col md:flex-row items-center justify-center gap-2 font-dancing text-gold-dark mb-4"
//               >
//                 <span>Marawan &</span>
//                 <span>Rawda</span>
//               </motion.h1>
//               <div className="flex items-center justify-center gap-4">
//                 <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="inline-block"
//                 >
//                   <Heart className="h-5 w-5 text-roseGold-400" />
//                 </motion.div>
//                 <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
//               </div>
//             </div>

//             {error && (
//               <Alert variant="destructive" className="mb-6">
//                 <AlertTitle>Error</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="relative"
//               >
//                 <label className="block text-sm font-cinzel text-gold-dark uppercase tracking-wider mb-2">
//                   Your Message
//                 </label>
//                 <Textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Write your wishes for the happy couple..."
//                   className="min-h-[120px] bg-white/50 border-gold-light/30 focus:border-gold-light focus:ring-gold-light/20 placeholder:text-gold-dark/40 font-cormorant text-lg"
//                 />
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <label className="block text-sm font-cinzel text-gold-dark uppercase tracking-wider mb-2">
//                   Share a Memory
//                 </label>
//                 <ImageUpload onImageSelect={handleImageSelect} />
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <label className="block text-sm font-cinzel text-gold-dark uppercase tracking-wider mb-2">
//                   Record Your Message
//                 </label>
//                 <AudioRecorder
//                   onRecordingComplete={handleAudioRecordingComplete}
//                 />
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="pt-4"
//               >
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-cinzel uppercase tracking-wider py-6 animate-shimmer bg-[length:200%_100%] transition-all duration-500 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
//                 >
//                   <span className="flex items-center justify-center gap-2">
//                     {isSubmitting ? (
//                       "Sending..."
//                     ) : (
//                       <div className="flex items-center gap-4">
//                         Send Your Wishes
//                         <BirdMessage className="w-4 h-4 text-white animate-bounce" />
//                       </div>
//                     )}
//                   </span>
//                 </Button>
//               </motion.div>
//             </form>
//           </motion.div>
//         ) : (
//           <motion.div>
//             <motion.div
//               key="thank-you"
//               initial={{ opacity: 0, x: "100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="max-w-2xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 md:p-16 border border-gold-light/20"
//             >
//               <EnvelopeLines />
//               <FloralCorner position="top-left" />
//               <FloralCorner position="top-right" />
//               <FloralCorner position="bottom-left" />
//               <FloralCorner position="bottom-right" />
//               <motion.p
//                 // initial={{ opacity: 0, x: 20 }}
//                 // animate={{ opacity: 1, x: 0 }}
//                 // transition={{ delay: 0.8, duration: 0.8 }}
//                 className="absolute w-36 -right-12 -top-6 [filter:sepia(100%)_saturate(180%)_brightness(70%)_hue-rotate(350deg)]"
//               >
//                 <Image
//                   src="/rb_20366.png"
//                   alt="widding img"
//                   width={500}
//                   height={500}
//                   className="w-36"
//                   style={{
//                     transform: "rotateY(180deg) rotateZ(17deg)",
//                   }}
//                 ></Image>
//               </motion.p>
//               <div className="text-center space-y-6 relative z-10">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
//                   className="w-20 h-20 mx-auto bg-gold-light/10 rounded-full flex items-center justify-center"
//                 >
//                   <Heart className="w-10 h-10 text-gold" fill="currentColor" />
//                 </motion.div>

//                 <motion.h2
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="font-dancing text-4xl md:text-5xl text-gold-dark"
//                 >
//                   Thank You!
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 }}
//                   className="font-cormorant text-xl text-gold-dark/80"
//                 >
//                   Your heartfelt wishes mean the world to us. Thank you for
//                   being part of our special day.
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8 }}
//                   className="pt-6"
//                 >
//                   <Button
//                     onClick={() => setIsSubmitted(false)}
//                     variant="outline"
//                     className="border-gold-light/30 text-gold-dark bg-gold-light/10 font-cinzel uppercase tracking-wider"
//                   >
//                     Send Another Message
//                   </Button>
//                 </motion.div>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1 }}
//                 className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
//               >
//                 <div className="relative">
//                   <BirdMessage className="w-12 h-12 text-gold-dark animate-float" />
//                   <motion.div
//                     animate={{
//                       y: [-4, 4, -4],
//                       x: [-2, 2, -2],
//                     }}
//                     transition={{
//                       repeat: Infinity,
//                       duration: 4,
//                       ease: "easeInOut",
//                     }}
//                     className="absolute -top-3 -right-2"
//                   >
//                     <Heart
//                       className="w-4 h-4 text-roseGold-400"
//                       fill="currentColor"
//                     />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1, duration: 0.8 }}
//               className="w-full flex justify-center mt-10"
//             >
//               <Image
//                 src="/rb_2147847814.png"
//                 alt="widding img"
//                 width={500}
//                 height={500}
//                 className="w-32 [filter:sepia(100%)_saturate(300%)_brightness(80%)_hue-rotate(350deg)]"
//               ></Image>
//             </motion.p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
