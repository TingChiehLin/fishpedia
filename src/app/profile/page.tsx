import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, BookOpen, Users } from "lucide-react";
import { api } from "@/lib/services/api";

export default async function ProfilePage() {
  const profile = await api.getProfile();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Profile</h1>
        <p className="text-xl text-gray-600">
          Welcome back, {profile.name}! Here&apos;s your fishing learning
          journey.
        </p>
      </div>

      {/* Profile Info */}
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
            <User size={48} className="text-blue-600" />
          </div>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>
          <CardDescription>Age Group: {profile.ageGroup}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {profile.points} Points
          </div>
          <Badge variant="secondary">Fishing Enthusiast</Badge>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="mx-auto mb-2 text-blue-600" size={32} />
            <CardTitle>{profile.completedQuizzes}</CardTitle>
            <CardDescription>Quizzes Completed</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Users className="mx-auto mb-2 text-green-600" size={32} />
            <CardTitle>{profile.activitiesDone}</CardTitle>
            <CardDescription>Activities Done</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Trophy className="mx-auto mb-2 text-yellow-600" size={32} />
            <CardTitle>{profile.badges.length}</CardTitle>
            <CardDescription>Badges Earned</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Earned Badges */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.badges.map((badge) => (
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

      {/* Learning Summary */}
      <section className="bg-linear-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Your Learning Summary</h2>
        <p className="text-gray-700">
          You&apos;ve shown great interest in learning about fish and fishing!
          Keep exploring to discover more species, complete more quizzes, and
          earn all the badges. Remember to have fun and learn with your family!
          🎣
        </p>
      </section>
    </div>
  );
}
