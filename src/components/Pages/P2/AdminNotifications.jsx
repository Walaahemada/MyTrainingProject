import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const ADMIN_ID = "4fbbe0aa-e204-4e45-9c2f-650172de16f6";

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", ADMIN_ID)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setNotifications(data || []);
  };

  const markAsRead = async (id) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    fetchNotifications();
  };

  const markAllAsRead = async () => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", ADMIN_ID);

    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();

    // إنشاء قناة Realtime
    const channel = supabase
      .channel("public:notifications") // أي اسم للقناة
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          if (payload.new.user_id === ADMIN_ID) {
            setNotifications((prev) => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="notifications-page">
      <div className="notif-header">
     
        {notifications.length > 0 && (
          <button style={{color:"#1b9bb7",background:"none"}} onClick={markAllAsRead}>تحديد الكل كمقروء</button>
        )}
           <h2 style={{marginLeft:"20px" }}>الإشعارات   </h2>
      </div>

      {notifications.length === 0 ? (
        <p>لا يوجد إشعارات حاليا</p>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {notifications.map((n) => (
            <div
              style={{backgroundColor:"white",borderRadius:"5px",padding:"15px", textAlign: "right", direction: "rtl" }}
              key={n.id}
              className={n.is_read ? "read" : "unread"}
              onClick={() => markAsRead(n.id)}
            >
              <h4 >{n.title}</h4>
              <p>{n.message}</p>
              <small>{new Date(n.created_at).toLocaleString("ar")}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;
