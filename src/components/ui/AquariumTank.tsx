"use client";

import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { AquariumFish, getAquariumFish } from "@/lib/aquariumStorage";
import Image from "next/image";

type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

function AquariumSeaweedDecoration() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-emerald-950/12 via-emerald-800/6 to-transparent" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 260"
        className="h-[150px] w-full sm:h-[180px] lg:h-[220px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bladeLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8C659" />
            <stop offset="100%" stopColor="#87AF43" />
          </linearGradient>
          <linearGradient id="bladeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#789E39" />
            <stop offset="100%" stopColor="#5C812A" />
          </linearGradient>
          <linearGradient id="bladeDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4D7424" />
            <stop offset="100%" stopColor="#35551A" />
          </linearGradient>
          <linearGradient id="rockFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7F9994" />
            <stop offset="100%" stopColor="#607A75" />
          </linearGradient>
          <filter
            id="bladeShadowNew"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <g opacity="0.14" filter="url(#bladeShadowNew)">
          <path
            d="M0 248C164 240 318 236 494 238C706 242 910 248 1094 242C1254 238 1368 238 1440 242V260H0V248Z"
            fill="#2B4A20"
          />
        </g>

        <g
          fill="url(#bladeDark)"
          className="aquarium-seaweed-sway-left"
          style={{ animationDuration: "7.2s", animationDelay: "0.3s" }}
        >
          <path d="M96 260C108 214 112 174 108 132C104 96 94 62 80 22C108 34 122 62 128 102C136 148 132 196 130 260Z" />
          <path d="M226 260C238 220 244 178 242 136C240 100 232 64 218 28C246 40 260 66 268 104C276 148 274 196 272 260Z" />
          <path d="M606 260C618 214 624 172 622 128C620 92 612 56 600 18C628 30 644 58 650 98C658 144 654 192 650 260Z" />
          <path d="M946 260C958 218 964 176 962 132C960 96 952 60 940 22C968 34 982 62 988 102C996 146 992 194 990 260Z" />
          <path d="M1370 260C1380 220 1384 180 1382 138C1380 102 1372 66 1360 28C1388 40 1400 68 1406 108C1412 152 1410 198 1408 260Z" />
        </g>

        <g
          fill="url(#bladeLight)"
          className="aquarium-seaweed-sway-right"
          style={{ animationDuration: "5.8s", animationDelay: "0.1s" }}
        >
          <path d="M50 260C72 214 94 176 122 138C154 96 186 60 206 18C220 38 218 64 208 90C190 132 162 174 132 212C110 238 96 250 88 260Z" />
          <path d="M162 260C184 212 210 170 242 128C278 82 310 44 332 6C344 30 340 56 328 84C306 126 274 166 240 206C214 234 198 248 188 260Z" />
          <path d="M352 260C372 216 394 178 420 142C448 102 474 68 492 28C506 46 506 72 496 98C480 138 454 178 424 214C402 238 388 250 380 260Z" />
        </g>

        <g
          fill="url(#bladeMid)"
          className="aquarium-seaweed-sway-left"
          style={{ animationDuration: "6.7s", animationDelay: "0.9s" }}
        >
          <path d="M438 260C456 214 478 176 504 138C532 96 560 58 582 16C596 38 594 62 586 88C570 130 544 172 514 210C492 236 478 248 470 260Z" />
          <path d="M548 260C566 216 582 176 594 136C608 92 616 48 614 4C638 20 650 48 654 84C660 136 650 192 638 260Z" />
          <path d="M700 260C720 214 742 176 768 138C798 96 828 58 850 14C864 38 862 62 852 88C834 132 808 172 778 210C754 236 740 248 732 260Z" />
        </g>

        <g
          fill="url(#bladeLight)"
          className="aquarium-seaweed-sway-right"
          style={{ animationDuration: "6.1s", animationDelay: "1.1s" }}
        >
          <path d="M792 260C812 216 836 178 864 140C894 98 922 62 942 18C956 40 954 66 944 92C928 134 900 176 870 214C848 238 834 250 826 260Z" />
          <path d="M914 260C932 216 948 178 962 140C978 96 986 52 986 8C1006 24 1018 50 1020 86C1024 138 1014 194 1004 260Z" />
          <path d="M1036 260C1056 216 1078 180 1104 144C1132 104 1158 68 1176 30C1190 50 1188 76 1180 100C1162 140 1138 180 1110 216C1088 238 1074 250 1066 260Z" />
        </g>

        <g
          fill="url(#bladeDark)"
          className="aquarium-seaweed-sway-left"
          style={{ animationDuration: "6.9s", animationDelay: "0.6s" }}
        >
          <path d="M1146 260C1160 218 1170 178 1172 136C1174 98 1168 60 1158 20C1184 34 1198 60 1204 98C1210 146 1208 194 1204 260Z" />
          <path d="M1244 260C1264 218 1286 180 1312 142C1340 102 1366 66 1386 24C1400 44 1398 68 1390 94C1374 136 1348 178 1320 214C1298 238 1282 250 1274 260Z" />
        </g>

        <g
          fill="url(#bladeLight)"
          className="aquarium-seaweed-sway-right"
          style={{ animationDuration: "5.2s", animationDelay: "1.4s" }}
        >
          <path d="M1206 260C1226 218 1246 182 1270 146C1298 106 1322 72 1340 38C1354 56 1352 80 1344 104C1328 142 1304 182 1278 218C1256 240 1242 252 1234 260Z" />
          <path d="M1334 260C1350 220 1362 184 1372 148C1384 102 1392 60 1396 18C1414 34 1422 58 1422 92C1420 144 1406 196 1388 260Z" />
        </g>

        <g opacity="0.14">
          <ellipse cx="262" cy="240" rx="118" ry="28" fill="#425D58" />
          <ellipse cx="842" cy="242" rx="132" ry="30" fill="#425D58" />
          <ellipse cx="1292" cy="242" rx="104" ry="26" fill="#425D58" />
        </g>

        <g>
          <path
            d="M120 258C128 226 160 216 194 218C220 220 246 232 274 230C308 228 338 212 364 216C392 220 410 238 410 258H120Z"
            fill="url(#rockFill)"
          />
          <path
            d="M668 258C678 224 716 214 762 216C798 218 828 232 866 230C910 228 948 212 982 216C1016 220 1040 238 1040 258H668Z"
            fill="url(#rockFill)"
          />
          <path
            d="M1186 258C1194 230 1222 220 1252 220C1276 220 1296 232 1322 230C1354 228 1380 216 1402 220C1424 224 1438 240 1438 258H1186Z"
            fill="url(#rockFill)"
          />
          <path
            d="M160 244C176 232 206 232 226 238"
            stroke="#90A8A2"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M736 242C760 230 798 232 824 240"
            stroke="#90A8A2"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M1242 242C1260 234 1286 234 1306 240"
            stroke="#90A8A2"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>
      </svg>
    </div>
  );
}

export default function AquariumTank() {
  const [fish, setFish] = useState<AquariumFish[]>([]);
  const [selectedFish, setSelectedFish] = useState<AquariumFish | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [heartbreakTick, setHeartbreakTick] = useState(0);
  const [loveTick, setLoveTick] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const tankRef = useRef<HTMLDivElement | null>(null);
  const fishRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setFish(getAquariumFish());
  }, []);

  useEffect(() => {
    if (!selectedFish) return;
    setQuiz(null);
    setQuizError(null);
    setSelectedOption(null);
    setQuizLoading(true);
    setHeartbreakTick(0);
    setLoveTick(0);
    setCurrentIndex(0);
    setAnsweredCount(0);
    setCorrectCount(0);
    setIsAdvancing(false);
    setIsFinished(false);

    const run = async () => {
      try {
        const res = await fetch("/api/fish-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fishName: selectedFish.name }),
        });
        const data = await res.json();
        if (!res.ok) {
          const detail = data?.details ? ` ${data.details}` : "";
          throw new Error(`${data?.error || "Failed to load quiz"}${detail}`);
        }
        const questions = Array.isArray(data?.questions) ? data.questions : [];
        setQuiz(questions);
      } catch (error) {
        setQuizError(
          error instanceof Error ? error.message : "Failed to load quiz",
        );
      } finally {
        setQuizLoading(false);
      }
    };

    run();
  }, [selectedFish]);

  const heartbreakTears = useMemo(() => {
    if (heartbreakTick === 0) return [];
    return Array.from({ length: 30 }).map(() => ({
      x: gsap.utils.random(-160, 160),
      y: gsap.utils.random(-140, 160),
      delay: gsap.utils.random(0, 0.2),
      duration: 2,
      size: gsap.utils.random(14, 22),
      rotate: gsap.utils.random(-45, 45),
    }));
  }, [heartbreakTick]);
  const heartbreakEmojis = ["😭", "😢", "😿", "💧", "💔"];
  const loveEmojis = ["❤️", "😍", "🥰", "😘", "💋"];

  const loveBursts = useMemo(() => {
    if (loveTick === 0) return [];
    return Array.from({ length: 30 }).map(() => ({
      x: gsap.utils.random(-160, 160),
      y: gsap.utils.random(-140, 160),
      delay: gsap.utils.random(0, 0.2),
      duration: 2,
      size: gsap.utils.random(14, 22),
      rotate: gsap.utils.random(-45, 45),
    }));
  }, [loveTick]);

  const totalQuestions = quiz?.length ?? 0;
  const activeQuestion =
    quiz && quiz.length > 0
      ? quiz[Math.min(currentIndex, quiz.length - 1)]
      : null;

  const fishList = useMemo(() => fish, [fish]);

  useLayoutEffect(() => {
    const tank = tankRef.current;
    if (!tank) return;

    const bounds = tank.getBoundingClientRect();
    const maxX = Math.max(0, bounds.width - 80);
    const maxY = Math.max(0, bounds.height - 80);

    const nodes = fishRefs.current.filter(Boolean);
    if (nodes.length === 0) return;

    const ctx = gsap.context(() => {
      nodes.forEach((el, index) => {
        if (!el) return;
        const fishItem = fishList[index];
        const hasFacing =
          fishItem?.facing === "left" || fishItem?.facing === "right";
        const direction = hasFacing
          ? fishItem.facing === "left"
            ? -1
            : 1
          : index % 2 === 0
            ? 1
            : -1;
        const y = gsap.utils.random(0, maxY);
        const duration = gsap.utils.random(10, 22);

        const startX = direction === 1 ? -80 : maxX + 80;
        const endX = direction === 1 ? maxX + 80 : -80;

        gsap.set(el, {
          x: startX,
          y,
          scaleX: hasFacing ? 1 : direction,
        });

        gsap.to(el, {
          x: endX,
          duration,
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(0, 2),
        });
      });
    }, tank);

    return () => ctx.revert();
  }, [fishList]);

  return (
    <section className="relative flex h-[calc(100dvh-96px)] flex-col overflow-hidden bg-gradient-to-b from-sky-100 via-cyan-200 to-blue-400 p-6 shadow-sm">
      <div className="absolute inset-0 opacity-40 pointer-events-none aquarium-waves" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="aquarium-bubble"
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div ref={tankRef} className="relative flex-1 overflow-hidden">
        {fishList.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
            <div className="text-3xl lg:text-5xl mb-2 animate-bounce">🐠</div>
            <p className="text-sm font-semibold">No fish yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Add a fish and it will start swimming here.
            </p>
          </div>
        ) : (
          fishList.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) fishRefs.current[index] = el;
              }}
              className="aquarium-fish"
              onClick={() => setSelectedFish(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setSelectedFish(item);
                }
              }}
            >
              <Image
                src={item.cutoutUrl}
                alt={item.name}
                width={144}
                height={144}
                className="h-36 w-auto drop-shadow-lg"
              />
            </div>
          ))
        )}
      </div>

      <AquariumSeaweedDecoration />

      {selectedFish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedFish(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-sky-800">
                  {selectedFish.name}
                </h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedFish(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 rounded-xl p-4 fish-spin-wrapper relative">
              <Image
                src={selectedFish.cutoutUrl}
                alt={selectedFish.name}
                width={500}
                height={500}
                className="w-full h-auto fish-spin-360"
              />

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <AnimatePresence>
                  {heartbreakTears.length > 0 && (
                    <motion.div
                      key={`burst-${heartbreakTick}`}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative h-0 w-0"
                    >
                      {heartbreakTears.map((tear, index) => (
                        <motion.span
                          key={`tear-${heartbreakTick}-${index}`}
                          initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.6, 1, 0.9],
                            x: tear.x,
                            y: tear.y,
                            rotate: tear.rotate,
                          }}
                          transition={{
                            duration: tear.duration,
                            delay: tear.delay,
                            ease: "easeOut",
                          }}
                          className="absolute left-0 top-0"
                        >
                          <span
                            style={{ fontSize: `${tear.size}px` }}
                            className="block drop-shadow-sm"
                          >
                            {heartbreakEmojis[index % heartbreakEmojis.length]}
                          </span>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                  {loveBursts.length > 0 && (
                    <motion.div
                      key={`love-${loveTick}`}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative h-0 w-0"
                    >
                      {loveBursts.map((tear, index) => (
                        <motion.span
                          key={`love-${loveTick}-${index}`}
                          initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.6, 1, 0.9],
                            x: tear.x,
                            y: tear.y,
                            rotate: tear.rotate,
                          }}
                          transition={{
                            duration: tear.duration,
                            delay: tear.delay,
                            ease: "easeOut",
                          }}
                          className="absolute left-0 top-0"
                        >
                          <span
                            style={{ fontSize: `${tear.size}px` }}
                            className="block drop-shadow-sm"
                          >
                            {loveEmojis[index % loveEmojis.length]}
                          </span>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {quizLoading && (
                <p className="text-sm text-gray-500">
                  Generating a fun fact quiz...
                </p>
              )}
              {quizError && <p className="text-sm text-red-600">{quizError}</p>}
              {quiz && totalQuestions === 0 && (
                <p className="text-sm text-gray-500">
                  No questions available right now.
                </p>
              )}
              {quiz && totalQuestions > 0 && !isFinished && activeQuestion && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-sky-600">
                    {answeredCount}/{totalQuestions}
                  </p>
                  <p className="text-sm font-semibold text-sky-800">
                    {activeQuestion.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {activeQuestion.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect = activeQuestion.answerIndex === index;
                      const isLocked =
                        isAdvancing || isFinished || selectedOption !== null;
                      return (
                        <button
                          key={option}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return;
                            setSelectedOption(index);
                            const correct =
                              index === activeQuestion.answerIndex;
                            setAnsweredCount((count) => count + 1);
                            if (correct) {
                              setCorrectCount((count) => count + 1);
                              setLoveTick((t) => t + 1);
                            } else {
                              setHeartbreakTick((t) => t + 1);
                            }
                            setIsAdvancing(true);
                            window.setTimeout(() => {
                              const nextIndex = currentIndex + 1;
                              if (nextIndex >= totalQuestions) {
                                setIsFinished(true);
                              } else {
                                setCurrentIndex(nextIndex);
                              }
                              setSelectedOption(null);
                              setIsAdvancing(false);
                            }, 1000);
                          }}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                            isSelected
                              ? isCorrect
                                ? "border-green-400 bg-green-50 text-green-700"
                                : "border-red-300 bg-red-50 text-red-700"
                              : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50"
                          } ${isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {quiz && totalQuestions > 0 && isFinished && (
                <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3">
                  <p className="text-sm font-semibold text-sky-800">
                    You got {correctCount}/{totalQuestions} right!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
