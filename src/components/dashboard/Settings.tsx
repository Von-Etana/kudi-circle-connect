
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Smartphone,
  Mail,
  Lock,
  Settings as SettingsIcon,
  Camera
} from "lucide-react";

export const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Adebayo Johnson",
    email: "adebayo.johnson@email.com",
    phone: "+234 803 123 4567",
    address: "Victoria Island, Lagos"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    paymentReminders: true,
    groupUpdates: true
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    biometricEnabled: true,
    sessionTimeout: "30"
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Settings Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSecurityUpdate = (key: string, value: boolean | string) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Security Settings Updated",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="w-6 h-6 text-emerald-600" />
        <h1 className="text-2xl font-bold text-emerald-800">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-emerald-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">AJ</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="border-emerald-200">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Badge className="bg-emerald-100 text-emerald-700">
                  Trust Score: 95% - Excellent
                </Badge>
              </div>

              <Button onClick={handleProfileUpdate} className="bg-emerald-600 hover:bg-emerald-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about important events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive text messages for urgent updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Browser and mobile app notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Reminders</p>
                    <p className="text-sm text-gray-500">Get notified before payments are due</p>
                  </div>
                  <Switch
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) => handleNotificationUpdate('paymentReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Group Updates</p>
                    <p className="text-sm text-gray-500">Notifications about group activities</p>
                  </div>
                  <Switch
                    checked={notifications.groupUpdates}
                    onCheckedChange={(checked) => handleNotificationUpdate('groupUpdates', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSecurityUpdate('twoFactorEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-gray-500">Use fingerprint or face recognition</p>
                  </div>
                  <Switch
                    checked={security.biometricEnabled}
                    onCheckedChange={(checked) => handleSecurityUpdate('biometricEnabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityUpdate('sessionTimeout', e.target.value)}
                    className="w-32 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <Button variant="outline" className="mr-2 border-emerald-200">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Download Security Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your payment methods and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-emerald-800">Premium Plan</h3>
                    <p className="text-sm text-emerald-600">Active until March 15, 2025</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payment Methods</h4>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4567</p>
                        <p className="text-sm text-gray-500">Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
                <Button variant="outline" className="border-emerald-200">
                  View Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
