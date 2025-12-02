import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import "./notification.css";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);

  // -----------------------------
  // 1) Mark Single Notification
  // -----------------------------
  const markAsRead = async (id) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );

      setCount((prev) => Math.max(prev - 1, 0));
    }
  };

  // -----------------------------
  // ⬅ 2) Mark All As Read
  // -----------------------------
  const markAllAsRead = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
      setCount(0);
    }
  };
  // -----------------------------
// ⬅ 3) Delete Single Notification
// -----------------------------
const deleteNotification = async (id) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", id);

  if (!error) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    // إذا الإشعار كان غير مقروء، نقص العدد
    setCount((prev) => Math.max(prev - (prev > 0 ? 1 : 0), 0));
  }
};


  // -----------------------------
  // 3) Fetch Current User
  // -----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) setUserId(user.id);
    };

    fetchUser();
  }, []);

  // -----------------------------
  // 4) Load Notifications
  // -----------------------------
  const loadNotifications = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) {
      setNotifications(data);
      setCount(data.filter((n) => !n.is_read).length);
    }
  };

  // -----------------------------
  // 5) Realtime receive updates
  // -----------------------------
  const setupRealtime = () => {
    if (!userId) return;

    supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
          setCount((prev) => prev + 1);
        }
      )
      .subscribe();
  };

  useEffect(() => {
    if (userId) {
      loadNotifications();
      setupRealtime();
    }
  }, [userId]);

  // -----------------------------
  // 6) UI
  // -----------------------------
  return (
    <div className="notif-wrapper">
      {/* أيقونة الجرس */}
      <div className="bell" onClick={() => setShowDropdown((prev) => !prev)}>
        <i className="ri-notification-3-line"></i>
        {count > 0 && <span className="notif-count">{count}</span>}
      </div>

      {/* القائمة المنسدلة */}
      {showDropdown && (
        <div className="notif-dropdown">

          {/* عنوان + زر تحديد الكل */}
          <div className="notif-header">
           

            {count > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                تحديد الكل كمقروء
              </button>
              
            )}
       
          </div>

          {/* المحتوى */}
          {notifications.map((n) => (
  <div
    key={n.id}
    className={`notif-item ${n.is_read ? "read" : "unread"}`}
  >
     {/* 🔥 زر حذف الإشعار */}
     <button
      className="delete-btn"
      onClick={() => deleteNotification(n.id)}
    >
      <i className="ri-delete-bin-line"></i>
    </button>
    <div className="notif-content" onClick={() => markAsRead(n.id)}>
      <strong>{n.title}</strong>
      <p>{n.message}</p>
      <span className="time">
        {new Date(n.created_at).toLocaleString()}
      </span>
    </div>

   
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default NotificationBell;
