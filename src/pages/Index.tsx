
import { Dashboard } from "@/components/dashboard/Dashboard";
import { NotificationsProvider } from "@/components/dashboard/NotificationsDropdown";

const Index = () => {
  return (
    <NotificationsProvider>
      <Dashboard />
    </NotificationsProvider>
  );
};

export default Index;
