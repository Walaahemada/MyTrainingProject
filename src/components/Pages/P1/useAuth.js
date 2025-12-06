import { useState, useEffect } from "react";
import supabase from "../supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // ✅ للتحقق النهائي من الجلسة

  useEffect(() => {
    // جلب الجلسة الحالية من Supabase
    const session = supabase.auth.session();
    if (session?.user) {
      setUser(session.user);
      setRole(session.user?.role || "student");
    } else {
      setUser(null);
      setRole(null);
    }

    setAuthChecked(true); // انتهى التحقق من الجلسة

    // الاستماع لتغيرات auth (تسجيل دخول / خروج)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setRole(session?.user?.role || null);
    });

    return () => listener?.unsubscribe();
  }, []);

  return { user, role, authChecked };
}
