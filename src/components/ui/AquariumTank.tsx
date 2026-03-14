"use client";

import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { AquariumFish, getAquariumFish } from "@/lib/aquariumStorage";

type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

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
          error instanceof Error ? error.message : "Failed to load quiz"
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
    quiz && quiz.length > 0 ? quiz[Math.min(currentIndex, quiz.length - 1)] : null;

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

        const direction = index % 2 === 0 ? 1 : -1;
        const y = gsap.utils.random(0, maxY);
        const duration = gsap.utils.random(10, 22);

        const startX = direction === 1 ? -80 : maxX + 80;
        const endX = direction === 1 ? maxX + 80 : -80;

        gsap.set(el, { x: startX, y, scaleX: direction });

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
    <section className="rounded-3xl border bg-gradient-to-b from-sky-100 via-cyan-200 to-blue-400 p-6 shadow-sm relative overflow-hidden min-h-screen flex flex-col">
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

      <div ref={tankRef} className="relative flex-1 min-h-[70vh]">
        {fishList.length === 0 ? (
          <div className="flex h-full items-center justify-center text-white/80 text-sm">
            Add fish to see them swim here.
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
              <img
                src={item.cutoutUrl}
                alt={item.name}
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
          ))
        )}
      </div>

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
              <img
                src={selectedFish.cutoutUrl}
                alt={selectedFish.name}
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
              {quizError && (
                <p className="text-sm text-red-600">{quizError}</p>
              )}
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
