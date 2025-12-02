import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user;
      setUser(currentUser);

      if (currentUser) {
        // جلب الدور من جدول users
        const { data: row } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        setRole(row?.role || null);
      }
    };

    fetchUser();
  }, []);

  return { user, role };
}
