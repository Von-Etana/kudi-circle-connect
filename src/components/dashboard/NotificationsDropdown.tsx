
import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  description: string;
  read: boolean;
  created_at: string;
}

const NotificationContext = createContext<{
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}>({
  notifications: [],
  unreadCount: 0,
  loading: false,
  markAsRead: () => {},
  markAllAsRead: () => {},
});

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationsDropdown() {
  const { notifications, unreadCount, loading, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      // Mark all as read when dropdown is opened
      markAllAsRead();
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="rounded-full"
        onClick={handleOpen}
      >
        <Bell className="w-6 h-6 text-emerald-700" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
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
          {loading ? (
            <div className="p-4 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" />
            </div>
          ) : (
            <ul className="max-h-80 overflow-auto divide-y divide-emerald-50">
              {notifications.length === 0 ? (
                <li className="p-4 text-gray-400 text-center">No notifications yet</li>
              ) : (
                notifications.map((notif) => (
                  <li key={notif.id} className={`p-4 transition-colors ${!notif.read ? 'bg-emerald-50' : ''}`}>
                    <div className="font-semibold text-gray-800">{notif.title}</div>
                    <div className="text-sm text-gray-700">{notif.description}</div>
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notif.created_at))} ago
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    await supabase.from('notifications').update({ read: true }).eq('id', notificationId);
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    if (!user) return;
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      loading,
      markAsRead,
      markAllAsRead,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}
