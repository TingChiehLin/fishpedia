"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quiz } from "@/lib/types";
import { api } from "@/lib/services/api";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);

  useEffect(() => {
    api.getQuizzes().then(setQuizzes);
  }, []);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = async () => {
    if (!currentQuiz || selectedAnswer === null) return;

    const result = await api.submitQuizResult(currentQuiz.id, selectedAnswer);
    setScore((prev) => prev + result.points);
    setShowResult(true);
    setCompletedQuizzes((prev) => prev + 1);
  };

  const nextQuiz = () => {
    setCurrentQuiz(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (currentQuiz) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuiz.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuiz.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => setSelectedAnswer(index)}
                disabled={showResult}
              >
                {option}
              </Button>
            ))}

            {showResult && (
              <div
                className={`p-4 rounded-lg ${selectedAnswer === currentQuiz.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                <p className="font-bold">
                  {selectedAnswer === currentQuiz.correctAnswer
                    ? "🎉 Correct!"
                    : "❌ Not quite right"}
                </p>
                <p>{currentQuiz.explanation}</p>
                <p className="font-semibold">
                  Points earned:{" "}
                  {selectedAnswer === currentQuiz.correctAnswer
                    ? currentQuiz.rewardPoints
                    : 0}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              {!showResult ? (
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={nextQuiz} className="flex-1">
                  Next Quiz
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fishing Quizzes
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Test your fishing knowledge and earn points!
        </p>
        <div className="bg-blue-100 p-4 rounded-lg inline-block">
          <p className="text-blue-800 font-semibold">
            Score: {score} points | Completed: {completedQuizzes} quizzes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{quiz.question}</CardTitle>
              <CardDescription>
                Reward: {quiz.rewardPoints} points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => startQuiz(quiz)} className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
