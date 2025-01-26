"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioRecorder } from "./audio-recorder";
import { ImageUpload } from "./image-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { FloralCorner } from "./floral-corner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { messageService } from "@/services/messageService";
import { BirdMessage } from "./icons/bird-message";
import Image from "next/image";
import { toast } from "sonner";

function EnvelopeLines() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gold-light"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-0 right-0 w-1/2 h-full bg-gold-light"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
          }}
        />
      </div>
    </>
  );
}

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: delay + index * 0.1,
              duration: 0.3,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }}
          className="inline-block relative"
        >
          <motion.span
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              delay: delay + index * 0.1,
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute bottom-0 left-0 h-[1.5px] bg-gold-light/30"
            style={{
              originX: 0,
            }}
          />
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function IntroSequence({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="min-h-[100dvh] flex flex-col items-center justify-center relative"
      initial="initial"
      animate="animate"
    >
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <BirdMessage className="w-16 h-16 text-gold-dark" />
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                  x: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-2"
              >
                <Heart
                  className="w-4 h-4 text-roseGold-400"
                  fill="currentColor"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative px-4">
          <div className="py-8 space-y-6">
            <div className="h-8 font-cormorant" dir="ltr">
              <AnimatedText text="The Wedding of" delay={0.8} />
            </div>

            <div
              className="font-dancing text-5xl md:text-7xl text-gold-dark flex flex-col md:flex-row items-center justify-center gap-4 h-auto md:h-24"
              dir="ltr"
            >
              <AnimatedText text="Marawan" delay={1.2} />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.5 }}
                className="text-roseGold-400"
              >
                &
              </motion.span>
              <AnimatedText text="Rawda" delay={2.5} />
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.2, duration: 1, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-light to-transparent"
            style={{ transformOrigin: "center" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10"
          >
            <Heart className="w-6 h-6 text-gold-light/20" fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10"
          >
            <Heart
              className="w-4 h-4 text-roseGold-400/20"
              fill="currentColor"
            />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-30 left-10"
          >
            <Heart className="w-4 h-4 text-roseGold-400" fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-9"
          >
            <Heart className="w-4 h-4 text-roseGold-400" fill="currentColor" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
            className="font-cormorant text-xl text-gold-dark/80 italic pt-4"
          >
            تعالوا و شاركونا كلمتكم الحلوة......
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <Image
              src="/rb_20359.webp"
              alt="widding img"
              width={500}
              height={500}
              className="w-36 [filter:sepia(100%)_saturate(150%)_brightness(70%)_hue-rotate(350deg)]"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            ></Image>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            delay: 4,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-light rounded-full" />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-roseGold-400 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold-light rounded-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            delay: 4,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold-light rounded-full" />
          <div className="absolute bottom-3/4 left-1/3 w-1 h-1 bg-roseGold-400 rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-light rounded-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 5.5 }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
}

export default function WeddingWishes() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showForm, isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !voiceFile && !imageFile) {
      toast.warning("متأكد مش عاوز تبعتلنا حاجه! 👀");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await messageService.sendMessage(
        message,
        imageFile || undefined,
        voiceFile || undefined
      );

      setIsSubmitted(true);

      setMessage("");
      setImageFile(null);
      setVoiceFile(null);
    } catch (err) {
      setError("للأسف حصل غلط... حاول تاني");
      console.error("Error submitting wishes:", err);
      setError("للأسف حصل غلط... حاول تاني");
      toast.error("للأسف حصل غلط... حاول تاني");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAudioRecordingComplete = (blob: Blob) => {
    const file = new File([blob], `voice-${Date.now()}.webm`, {
      type: "audio/webm",
    });
    setVoiceFile(file);
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-cream to-white p-4 md:p-8"
      dir="rtl"
    >
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, y: 20 }}
            className="container mx-auto"
          >
            <IntroSequence
              onComplete={() => setTimeout(() => setShowForm(true), 1000)}
            />
          </motion.div>
        ) : !isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-12 md:p-16 border border-gold-light/20"
          >
            <FloralCorner position="top-left" />
            <FloralCorner position="top-right" />
            <FloralCorner position="bottom-left" />
            <FloralCorner position="bottom-right" />

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0, duration: 0.8 }}
              className="absolute w-36 -left-12 top-[10%] [filter:sepia(100%)_saturate(250%)_brightness(80%)_hue-rotate(350deg)]"
            >
              <Image
                src="/rb_20352.webp"
                alt="widding img"
                width={500}
                height={500}
                className="w-36 rotate-90"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute w-36 -right-14 bottom-[20%] [filter:sepia(100%)_saturate(180%)_brightness(70%)_hue-rotate(350deg)]"
            >
              <Image
                src="/rb_1017.webp"
                alt="widding img"
                width={500}
                height={500}
                className="w-36"
                style={{
                  transform: "rotateY(180deg) rotateZ(50deg)",
                }}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </motion.p>

            <div className="text-center mb-12 relative">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gold-dark font-dancing text-[0.955rem] mb-4"
              >
                شاركوا فرحتكم معانا
              </motion.p>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl flex flex-col md:flex-row items-center justify-center gap-2 font-dancing text-gold-dark mb-4"
                dir="ltr"
              >
                <span>Marawan &</span>
                <span>Rawda</span>
              </motion.h1>
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block"
                >
                  <Heart className="h-5 w-5 text-roseGold-400" />
                </motion.div>
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>خطأ</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-[0.955rem] font-cinzel text-gold-dark uppercase tracking-wider mb-2">
                  اكتب كلمتك الحلوة
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300.000000 300.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-6 w-6 stroke-current"
                    fill="currentColor"
                  >
                    <g
                      transform="translate(0.00000,300.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M2330 2328 c-87 -7 -116 -14 -170 -41 -82 -40 -88 -42 -72 -26 21 22
13 32 -20 25 -74 -15 -109 -28 -139 -53 -32 -27 -32 -27 -24 -3 6 19 4 22 -9
17 -9 -4 -42 -14 -74 -23 -88 -25 -146 -59 -191 -110 -46 -52 -48 -52 -25 1 8
20 13 40 10 42 -3 3 -33 -5 -66 -17 -40 -15 -71 -35 -91 -59 -17 -20 -26 -26
-20 -13 7 12 9 22 5 22 -3 0 -53 -30 -110 -67 -89 -59 -108 -76 -135 -123 -17
-30 -28 -47 -25 -37 23 72 24 72 -40 31 -101 -64 -165 -115 -174 -137 -4 -12
-13 -42 -18 -67 l-10 -45 -1 36 c0 20 -8 42 -16 49 -18 15 -37 4 -101 -57 -72
-68 -84 -90 -85 -157 l-1 -61 -10 54 c-12 63 -20 56 -38 -31 -15 -74 -15 -186
0 -266 l11 -63 -56 -90 c-31 -49 -63 -89 -72 -89 -8 0 -13 -7 -11 -18 2 -10
-17 -42 -44 -73 -40 -47 -46 -61 -50 -109 -2 -30 -8 -64 -13 -74 -6 -13 -5
-17 2 -13 6 4 13 3 15 -2 4 -12 924 -28 1118 -20 152 7 278 28 332 55 42 22
68 62 68 107 0 82 -99 134 -270 144 -109 6 -190 -6 -266 -41 -140 -64 -59
-146 145 -146 121 1 231 27 231 56 0 16 -36 37 -53 30 -7 -2 -5 -5 4 -5 9 -1
22 -7 28 -15 18 -21 -40 -36 -169 -43 -158 -8 -259 25 -219 73 31 38 100 57
222 62 142 5 229 -13 283 -61 41 -35 43 -64 9 -105 -59 -70 -209 -84 -850 -80
-275 2 -525 -1 -555 -5 l-55 -8 35 31 c19 16 42 30 52 30 21 0 39 27 63 93 10
26 27 52 37 58 10 6 18 15 16 22 -4 21 13 58 58 127 l44 68 102 9 103 9 -35
17 -35 17 65 -5 c105 -8 152 22 305 193 l30 34 -80 -6 c-84 -6 -85 -6 61 24
40 8 61 21 93 52 23 23 41 46 41 50 0 4 -30 9 -67 9 -67 1 -67 2 -23 10 25 4
63 8 85 8 34 1 50 10 103 56 35 30 59 55 55 55 -5 0 -18 7 -29 15 -18 14 -17
14 11 9 17 -3 41 -1 55 4 27 10 140 100 140 111 0 4 -12 12 -27 18 -26 10 -25
11 21 12 43 1 63 10 169 79 115 73 119 77 91 83 -27 6 -27 7 9 8 52 1 96 22
195 89 74 50 81 58 60 63 -19 4 -17 6 16 12 43 7 169 84 160 98 -3 5 3 9 13 9
24 1 115 68 108 80 -7 12 -87 11 -235 -2z m-195 -128 c-11 -5 -74 -30 -140
-55 -153 -59 -356 -161 -465 -233 -191 -127 -466 -380 -643 -592 -81 -96 -209
-276 -223 -314 -6 -15 -34 -23 -34 -9 0 21 181 273 257 358 377 421 695 651
1113 805 119 43 192 65 135 40z m98 -77 c-7 -2 -21 -2 -30 0 -10 3 -4 5 12 5
17 0 24 -2 18 -5z m-1574 -1209 c2 -2 2 -7 -2 -10 -3 -3 -16 2 -29 11 l-23 17
25 -7 c14 -4 27 -9 29 -11z m-63 -94 c-15 -38 -32 -70 -38 -70 -11 0 -12 -1
27 88 37 84 45 70 11 -18z m-36 12 c0 -5 -8 -17 -19 -26 -18 -16 -18 -16 -14
9 5 22 33 37 33 17z"
                      />
                    </g>
                  </svg>
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب تهنئة أو ذكرى حلوة للعروسين... 💕"
                  className="min-h-[120px] bg-white/50 border-gold-light/30 focus:border-gold-light focus:ring-gold-light/20 placeholder:text-gold-dark/40 font-cormorant text-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-3 text-[0.955rem] font-cinzel text-gold-dark uppercase tracking-wider mb-2">
                  شاركنا صورة من الذكريات{" "}
                  <svg
                    viewBox="0 -6 74.665939 74.665939"
                    id="svg2"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6 text-gold-dark stroke-current"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <defs id="defs6">
                        <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath110"
                        >
                          <path d="M 0,64 H 64 V 0 H 0 Z" id="path108"></path>
                        </clipPath>
                      </defs>
                      <g
                        id="g102"
                        transform="matrix(1.3333333,0,0,-1.3333333,-5.3333332,73.332798)"
                      >
                        <g id="g104">
                          <g clipPath="url(#clipPath110)" id="g106">
                            <path
                              d="M 45,29 H 34 v 11 h 11 z m 1,13 H 33 c -0.553,0 -1,-0.448 -1,-1 V 28 c 0,-0.552 0.447,-1 1,-1 h 13 c 0.553,0 1,0.448 1,1 v 13 c 0,0.552 -0.447,1 -1,1"
                              id="path112"
                              style={{
                                fill: "currentcolor",
                                fillOpacity: 1,
                                fillRule: "nonzero",
                                stroke: "none",
                              }}
                            ></path>
                            <g id="g114" transform="translate(39.5,37)">
                              <path
                                d="M 0,0 C 1.379,0 2.5,-1.122 2.5,-2.5 2.5,-3.878 1.379,-5 0,-5 c -1.379,0 -2.5,1.122 -2.5,2.5 0,1.378 1.121,2.5 2.5,2.5 m 0,-7 c 2.481,0 4.5,2.019 4.5,4.5 C 4.5,-0.019 2.481,2 0,2 -2.481,2 -4.5,-0.019 -4.5,-2.5 -4.5,-4.981 -2.481,-7 0,-7"
                                id="path116"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g118" transform="translate(34,50)">
                              <path
                                d="m 0,0 h 11 c 0.553,0 1,0.448 1,1 0,0.552 -0.447,1 -1,1 H 0 C -0.553,2 -1,1.552 -1,1 -1,0.448 -0.553,0 0,0"
                                id="path120"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g122" transform="translate(27,20)">
                              <path
                                d="m 0,0 h 26 c 0.553,0 1,0.448 1,1 0,0.552 -0.447,1 -1,1 H 0 C -0.553,2 -1,1.552 -1,1 -1,0.448 -0.553,0 0,0"
                                id="path124"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g126" transform="translate(48,19)">
                              <path
                                d="m 0,0 h -15 c -0.553,0 -1,-0.448 -1,-1 0,-0.552 0.447,-1 1,-1 H 0 c 0.553,0 1,0.448 1,1 0,0.552 -0.447,1 -1,1"
                                id="path128"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g130" transform="translate(57.416,11.0566)">
                              <path
                                d="M 0,0 C -0.524,-0.671 -1.313,-1.057 -2.165,-1.057 H -32.85 c -0.851,0 -1.64,0.386 -2.165,1.057 -0.524,0.671 -0.707,1.531 -0.504,2.344 l 0.196,0.736 c 0.731,-0.715 1.697,-1.137 2.731,-1.137 h 30.169 c 1.035,0 2.001,0.422 2.733,1.137 L 0.501,2.357 C 0.707,1.531 0.524,0.671 0,0 m -46.416,14.943 v 9.232 c 0.645,-0.147 1.312,-0.232 2,-0.232 0.688,0 1.355,0.085 2,0.232 v -9.232 z m -5,18 c 0,3.86 3.141,7 7,7 3.859,0 7,-3.14 7,-7 0,-2.372 -1.189,-4.469 -3,-5.736 v 4.736 c 0,0.553 -0.447,1 -1,1 -0.553,0 -1,-0.447 -1,-1 v -5.705 c -0.635,-0.189 -1.305,-0.295 -2,-0.295 -0.695,0 -1.365,0.106 -2,0.295 v 5.705 c 0,0.553 -0.447,1 -1,1 -0.553,0 -1,-0.447 -1,-1 v -4.736 c -1.811,1.267 -3,3.364 -3,5.736 m 19,-2.949 c 0,1.075 0.875,1.949 1.95,1.949 h 26.1 c 1.075,0 1.95,-0.874 1.95,-1.949 V 14.943 h -30 z m 5,8.949 v -2 c 0,-0.552 0.447,-1 1,-1 h 17 c 0.553,0 1,0.448 1,1 v 2.021 l 2,0.042 v -5.063 h -23.011 l -0.052,5 z m 2,3 h 15 v -4 h -15 z m -9.096,-35.797 1.86,6.797 H -2.197 L -0.521,6.228 C -0.417,5.661 -0.568,5.082 -0.937,4.64 -1.306,4.197 -1.848,3.943 -2.423,3.943 h -30.169 c -0.575,0 -1.117,0.254 -1.485,0.697 -0.369,0.442 -0.521,1.021 -0.435,1.506 M 2.438,2.855 1.433,6.65 v 10e-4 l -1.849,7.416 v 15.927 c 0,2.177 -1.772,3.949 -3.95,3.949 h -0.05 v 5.063 c 0,1.068 -0.869,1.937 -1.937,1.937 h -2.063 v 2 c 0,0.553 -0.447,1 -1,1 h -17 c -0.553,0 -1,-0.447 -1,-1 v -2 h -2.063 c -1.068,0 -1.937,-0.869 -1.937,-1.937 v -5.192 c -1.718,-0.427 -3,-1.972 -3,-3.82 V 14.943 h -6 v 9.95 c 2.959,1.476 5,4.526 5,8.05 0,4.963 -4.037,9 -9,9 -4.963,0 -9,-4.037 -9,-9 0,-3.524 2.041,-6.574 5,-8.05 v -10.95 c 0,-0.552 0.447,-1 1,-1 h 1 v -2 c 0,-0.552 0.447,-1 1,-1 h 2 c 0.553,0 1,0.448 1,1 v 2 h 1 6.69 l -1.709,-6.261 c -0.002,-0.006 -0.006,-0.011 -0.008,-0.017 l -1.012,-3.823 c -0.358,-1.428 -0.042,-2.913 0.864,-4.073 0.905,-1.16 2.27,-1.826 3.741,-1.826 h 30.685 c 1.472,0 2.836,0.666 3.741,1.826 0.906,1.16 1.222,2.645 0.862,4.086"
                                id="path132"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g134" transform="translate(52.4961,30)">
                              <path
                                d="M 0,0 H -1.992 C -2.271,0 -2.496,-0.226 -2.496,-0.504 V -2.496 C -2.496,-2.774 -2.271,-3 -1.992,-3 H 0 c 0.278,0 0.504,0.226 0.504,0.504 v 1.992 C 0.504,-0.226 0.278,0 0,0"
                                id="path136"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                            <g id="g138" transform="translate(27,41)">
                              <path
                                d="m 0,0 c -0.553,0 -1,-0.448 -1,-1 0,-0.552 0.447,-1 1,-1 0.553,0 1,0.448 1,1 0,0.552 -0.447,1 -1,1"
                                id="path140"
                                style={{
                                  fill: "currentcolor",
                                  fillOpacity: 1,
                                  fillRule: "nonzero",
                                  stroke: "none",
                                }}
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </label>
                <ImageUpload onImageSelect={handleImageSelect} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-[0.955rem] font-cinzel text-gold-dark uppercase tracking-wider mb-2">
                  سجلوا صوتكم برسالة جميلة
                </label>
                <AudioRecorder
                  onRecordingComplete={handleAudioRecordingComplete}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-cinzel uppercase tracking-wider py-6 animate-shimmer bg-[length:200%_100%] transition-all duration-500 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      "جاري الإرسال..."
                    ) : (
                      <div className="flex items-center gap-4">
                        اتفضل وابعت تهنئتك
                        <BirdMessage className="w-4 h-4 text-white animate-bounce" />
                      </div>
                    )}
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div>
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 md:p-16 border border-gold-light/20"
            >
              <EnvelopeLines />
              <FloralCorner position="top-left" />
              <FloralCorner position="top-right" />
              <FloralCorner position="bottom-left" />
              <FloralCorner position="bottom-right" />
              <motion.p className="absolute w-36 -right-12 -top-6 [filter:sepia(100%)_saturate(180%)_brightness(70%)_hue-rotate(350deg)]">
                <Image
                  src="/rb_20366.webp"
                  alt="widding img"
                  width={500}
                  height={500}
                  className="w-36"
                  style={{
                    transform: "rotateY(180deg) rotateZ(17deg)",
                  }}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                ></Image>
              </motion.p>
              <div className="text-center space-y-6 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 mx-auto bg-gold-light/10 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-10 h-10 text-gold" fill="currentColor" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-dancing text-4xl md:text-5xl text-gold-dark"
                >
                  شكراً أوي!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="font-cormorant text-xl text-gold-dark/80"
                >
                  كلمتكم الحلوه هتفضل معانا للأبد ❤️ شكرًا لأنك جزء من يومنا
                  المميز.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-6"
                >
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-gold-light/30 text-gold-dark bg-gold-light/10 font-cinzel uppercase tracking-wider"
                  >
                    عايز تبعت رسالة تانية؟
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="relative">
                  <BirdMessage className="w-12 h-12 text-gold-dark animate-float" />
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                      x: [-2, 2, -2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-3 -right-2"
                  >
                    <Heart
                      className="w-4 h-4 text-roseGold-400"
                      fill="currentColor"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-full flex justify-center mt-10"
            >
              <Image
                src="/rb_2147847814.webp"
                alt="widding img"
                width={500}
                height={500}
                className="w-32 [filter:sepia(100%)_saturate(300%)_brightness(80%)_hue-rotate(350deg)]"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
