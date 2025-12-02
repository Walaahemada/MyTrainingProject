import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import SummaryCard from "./SummaryCard";
import StatusFilter from "./StatusFilter";
import StudentsList from "./StudentsList";

export default function StudentsR() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: oppData } = await supabase
        .from("opportunities")
        .select("id")
        .eq("company_id", user.id);

      const opportunityIds = (oppData || []).map(o => o.id);

      if (!opportunityIds.length) {
        setApplications([]);
        setLoading(false);
        return;
      }

      const { data: appData } = await supabase
        .from("proposals")
        .select(`
          id,
          status,
          created_at,
          student_id,
          student:student_id(full_name),
          opportunity:opportunity_id(id, title, type, end_date)
        `)
        .in("opportunity_id", opportunityIds)
        .order("created_at", { ascending: false });

      setApplications(appData || []);
      setLoading(false);
    };

    fetchApplications();
  }, []);

  const updateStatus = async (proposalId, newStatus, studentId, oppTitle) => {
    const { error } = await supabase
      .from("proposals")
      .update({ status: newStatus })
      .eq("id", proposalId);

    if (error) {
      alert("خطأ أثناء تحديث الحالة");
      return;
    }

    await supabase.from("notifications").insert({
      user_id: studentId,
      message: `تم ${newStatus === "مقبول" ? "قبول" : "رفض"} طلبك على فرصة: ${oppTitle}`
    });

    setApplications(prev =>
      prev.map(app =>
        app.id === proposalId ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications =
    activeFilter === "الكل"
      ? applications
      : applications.filter((a) => a.status === activeFilter);

  if (loading) return <p>جارٍ التحميل...</p>;

  const summaryData = [
    { id: 1, title: "اجمالي الطلبات", count: applications.length, icon: <i class="ri-user-line text-blue-600 text-xl"></i> },
    { id: 2, title: "قيد المراجعة", count: applications.filter(a => a.status === "قيد المراجعة").length, icon: <i class="ri-time-line text-yellow-600 text-xl"></i> },
    { id: 3, title: "مقبول", count: applications.filter(a => a.status === "مقبول").length, icon: <i class="ri-check-line text-green-600 text-xl"></i> },
    { id: 4, title: "مرفوض", count: applications.filter(a => a.status === "مرفوض").length, icon: <i class="ri-close-line text-red-600 text-xl"></i> },
  ];

  return (
    <main className="main-app" dir="rtl">
      <section className="summary-row">
        {summaryData.map(s => (
          <SummaryCard key={s.id} title={s.title} count={s.count} icon={s.icon} />
        ))}
      </section>

      <StatusFilter
        filters={["الكل", "قيد المراجعة", "مقبول", "مرفوض"]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <StudentsList 
        applications={filteredApplications}
        updateStatus={updateStatus}
      />
    </main>
  );
}
