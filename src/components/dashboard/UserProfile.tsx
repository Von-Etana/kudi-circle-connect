
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Star, 
  Award, 
  TrendingUp, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Users
} from "lucide-react";

export const UserProfile = () => {
  const profileStats = [
    { label: "Groups Joined", value: "7", icon: Users, color: "text-blue-600" },
    { label: "Total Contributions", value: "₦245,000", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Member Since", value: "Jan 2023", icon: Calendar, color: "text-purple-600" },
    { label: "Trust Rating", value: "95%", icon: Shield, color: "text-amber-600" }
  ];

  const achievements = [
    { title: "Early Adopter", description: "One of the first 100 users", earned: true },
    { title: "Reliable Member", description: "Never missed a payment", earned: true },
    { title: "Community Builder", description: "Created 3+ groups", earned: false },
    { title: "Top Contributor", description: "Highest monthly contribution", earned: true }
  ];

  const recentActivity = [
    { action: "Joined Alumni Association group", date: "2 days ago", type: "group" },
    { action: "Completed Family Circle payout", date: "1 week ago", type: "payment" },
    { action: "Invited 2 new members", date: "2 weeks ago", type: "invite" },
    { action: "Updated security settings", date: "3 weeks ago", type: "security" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <User className="w-6 h-6 text-emerald-600" />
        <h1 className="text-2xl font-bold text-emerald-800">Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-emerald-100">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-emerald-800">Adebayo Johnson</h2>
                  <p className="text-gray-600">Premium Member</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-2">5.0</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>adebayo.johnson@email.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+234 803 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Victoria Island, Lagos</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Trust Score */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Trust Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">95%</span>
                  <Badge className="bg-emerald-100 text-emerald-700">Excellent</Badge>
                </div>
                <Progress value={95} className="h-2" />
                <p className="text-sm text-gray-600">
                  Your trust score is based on payment history, group participation, and community feedback.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <Card key={index} className="border-emerald-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <div>
                      <p className="text-lg font-semibold">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Your milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Award
                        className={`w-5 h-5 ${
                          achievement.earned ? 'text-emerald-600' : 'text-gray-400'
                        }`}
                      />
                      <div>
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-emerald-800' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'group' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-emerald-500' :
                      activity.type === 'invite' ? 'bg-purple-500' :
                      'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
