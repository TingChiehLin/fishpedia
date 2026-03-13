import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/services/api";

export default async function ProgressPage() {
  const progress = await api.getProgress();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Progress</h1>
        <p className="text-xl text-gray-600">
          See your achievements and track your fishing learning journey!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-600">
              {progress.points}
            </CardTitle>
            <CardDescription>Total Points</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-600">
              {progress.completedQuizzes}
            </CardTitle>
            <CardDescription>Quizzes Completed</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-purple-600">
              {progress.activitiesDone}
            </CardTitle>
            <CardDescription>Activities Done</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Earned Badges */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Your Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress.badges.map((badge) => (
            <Card key={badge.id} className="text-center">
              <CardHeader>
                <div className="text-4xl mb-2">{badge.icon}</div>
                <CardTitle className="text-lg">{badge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress Summary */}
      <section className="bg-linear-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Keep Learning!</h2>
        <div className="space-y-2">
          <p>🎣 Complete more quizzes to earn points</p>
          <p>👨‍👩‍👧‍👦 Try family activities for extra rewards</p>
          <p>📚 Learn about new fish species</p>
          <p>🏆 Unlock all badges to become a fishing expert!</p>
        </div>
      </section>
    </div>
  );
}
