import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/services/api";

export default async function ActivitiesPage() {
  const activities = await api.getActivities();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Family Activities
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fun activities to enjoy fishing together as a family and learn more
          about fish!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{activity.title}</CardTitle>
              <CardDescription>
                Reward: {activity.rewardPoints} points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <Button className="w-full">Mark as Completed</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Activity Ideas
        </h2>
        <ul className="space-y-2 text-green-800">
          <li>• Go on a family fishing trip and identify fish together</li>
          <li>• Create a fishing journal to record your catches</li>
          <li>• Learn about local fishing regulations as a family</li>
          <li>• Make fishing-themed crafts or drawings</li>
          <li>• Share fishing stories from your family history</li>
        </ul>
      </section>
    </div>
  );
}
