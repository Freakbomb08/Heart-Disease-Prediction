import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

interface ProfileSettingsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ darkMode, toggleDarkMode }) => {
  const { toast } = useToast();
  const { user: authUser, fetchUser } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  // Local state for notifications only
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (authUser) {
      setUser({
        username: authUser.username || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
      });
    }
  }, [authUser]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await api.put("/api/users/profile", {
        username: user.username,
        phoneNumber: user.phoneNumber,
      });
      await fetchUser();
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationsChange = (value: boolean) => {
    setNotifications(value);
    toast({
      title: "Settings Updated",
      description: `Notifications have been ${value ? "enabled" : "disabled"}.`,
    });
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    toast({
      title: "Settings Updated",
      description: `Dark mode has been ${!darkMode ? "enabled" : "disabled"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile & Settings</h1>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={user.username}
              onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={user.phoneNumber}
              onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <Button onClick={handleProfileUpdate}>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
          <CardDescription>
            Customize your app experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for assessment results and updates.
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={handleNotificationsChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch to dark theme for better visibility.
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
