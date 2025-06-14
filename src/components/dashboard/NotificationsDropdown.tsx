
import { useState, createContext, useContext } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

// Shared context for notifications
const NotificationContext = createContext<{
  notifications: { title: string; description: string; time: string }[];
  addNotification: (notif: { title: string; description: string }) => void;
}>({
  notifications: [],
  addNotification: () => {},
});

let notifId = 0;
function getTime() {
  // Returns live time e.g., "12:18pm"
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Export a provider hook to be used in Dashboard
export function useNotifications() {
  const ctx = useContext(NotificationContext);
  return ctx;
}

// Notifications dropdown with bell
export function NotificationsDropdown() {
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);

  // Bell shows a dot for new unread notifications
  const unread = notifications.length > 0;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="rounded-full"
        onClick={() => setOpen(!open)}
      >
        <Bell className="w-6 h-6 text-emerald-700" />
        {unread && (
          <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-emerald-100 rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3 border-b border-emerald-100 flex justify-between items-center">
            <span className="font-medium text-lg text-emerald-800">Notifications</span>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
          <ul className="max-h-64 overflow-auto divide-y divide-emerald-50">
            {notifications.length === 0 ? (
              <li className="p-4 text-gray-400 text-center">No notifications yet</li>
            ) : notifications.map((notif, idx) => (
              <li key={idx} className="p-4 hover:bg-emerald-50 transition-colors">
                <div className="font-semibold text-gray-800">{notif.title}</div>
                <div className="text-sm text-gray-700">{notif.description}</div>
                <div className="text-right text-xs text-gray-400 mt-1">{notif.time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Context Provider: Wrap Dashboard page with this!
export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<{ title: string; description: string; time: string }[]>([]);

  const addNotification = (notif: { title: string; description: string }) => {
    setNotifications((prev) => [
      {
        ...notif,
        time: getTime(),
      },
      ...prev,
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
