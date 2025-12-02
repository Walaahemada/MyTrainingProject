import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import StatCard from "./StatCard";
import UserCard from "./UserCard";

function Overview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeOpp: 0,
    pendingOpp: 0,
    endedOpp: 0,
    totalApplications: 0,
    students: 0,
    companies: 0,
    pendingUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      /* 👤 USERS */
      const { data: users } = await supabase.from("users").select("*");
      const students = users.filter((u) => u.user_type === "student").length;
      const companies = users.filter((u) => u.user_type === "company").length;
      const pendingUsers = users.filter((u) => u.status === "pending").length;

      /* 🧳 OPPORTUNITIES */
      const { data: opps } = await supabase.from("opportunities").select("*");

      const activeOpp = opps.filter((o) => o.status === "نشطة").length;
      const pendingOpp = opps.filter((o) => o.status === "في الانتظار").length;
      const endedOpp = opps.filter((o) => o.status === "منتهية").length;

      /* 📄 APPLICATIONS */
      const { data: proposals } = await supabase.from("proposals").select("*");

      setStats({
        totalUsers: users.length,
        activeOpp,
        pendingOpp,
        endedOpp,
        totalApplications: proposals.length,
        students,
        companies,
        pendingUsers,
      });

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>جارٍ تحميل البيانات...</p>;

  return (
    <div>
      <div className="dashboard-cards">
        <StatCard
          title="في الانتظار"
          value={stats.pendingOpp}
          icon="ri-time-line text-2xl"
          BC="#fef9c3"
          C="#ca8a04"
        />

        <StatCard
          title="إجمالي الطلبات"
          value={stats.totalApplications}
          icon="ri-file-list-line text-2xl"
          percentage="15%"
          status="up"
          C="#9333ea"
          BC="#f3e8ff"
        />

        <StatCard
          title="الفرص النشطة"
          value={stats.activeOpp}
          icon="ri-briefcase-line text-2xl"
          percentage="8%"
          status="up"
          C="#16a34a"
          BC="#dcfce7"
        />

        <StatCard
          title="إجمالي المستخدمين"
          value={stats.totalUsers}
          percentage="12%"
          status="up"
          C="#2563eb"
          BC="#dbeafe"
        />
      </div>

      <div className="dashboard-cards">
        <UserCard
          T="حالة الفرص"
          X1="نشطة"
          X2="في الانتظار"
          X3="منتهية"
          Y1={stats.activeOpp}
          Y2={stats.pendingOpp}
          Y3={stats.endedOpp}
        />

        <UserCard
          T="توزيع المستخدمين"
          X1="الطلاب"
          X2="الشركات"
          X3="معلقون"
          Y1={stats.students}
          Y2={stats.companies}
          Y3={stats.pendingUsers}
        />
      </div>
    </div>
  );
}

export default Overview;
