 import React, { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import RecentList from "./RecentList";
import ApplicationsList from "./ApplicationsList";
import supabase from "../../../supabase";

export default function Main() {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // جلب الفرص الخاصة بالشركة
      const { data: oppData, error: oppError } = await supabase
        .from("opportunities")
        .select("*")
        .eq("company_id", user.id)
        .order("created_at", { ascending: false });

      if (oppError) {
        console.error("Error fetching opportunities:", oppError);
        setLoading(false);
        return;
      }

      setOpportunities(oppData || []);

      // جلب الطلبات (proposals) للفرص الخاصة بالشركة مع بيانات الطالب واسم الفرصة
      const { data: appData, error: appError } = await supabase
        .from("proposals")
        .select(`
          id,
          status,
          created_at,
          student:student_id(full_name, university, major),
          opportunity:opportunity_id(title)
        `)
        .in("opportunity_id", (oppData || []).map(o => o.id))
        .order("created_at", { ascending: false });

      if (appError) {
        console.error("Error fetching proposals:", appError);
      }

      // تحويل البيانات لتتناسب مع ApplicationsList
      const formattedApplications = (appData || []).map(p => ({
        id: p.id,
        name: p.student.full_name,
        uni: `${p.student.university} - ${p.student.major}`,
        training: p.opportunity.title,
        date: new Date(p.created_at).toLocaleDateString(),
        status: p.status
      }));

      setApplications(formattedApplications);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>جارٍ تحميل البيانات...</p>;

  // إنشاء summaryData بعد تحميل الفرص والطلبات
  const summaryData = [
    { id: 1, title: "إجمالي الفرص المنشورة", count: opportunities.length, icon: <i className="ri-briefcase-line text-blue-600 text-xl"></i> },
    { id: 2, title: "طلبات التقديم", count: applications.length, icon: <i className="ri-user-line text-green-600 text-xl"></i> },
    { id: 3, title: " في الانتظار", count: opportunities.filter(o => o.status === "في الانتظار").length, icon: <i className="ri-time-line text-purple-600 text-xl"></i> },
    { id: 4, title: "المقبولين", count: applications.filter(a => a.status === "مقبول").length, icon: <i className="ri-check-line text-emerald-600 text-xl"></i> },
  ];

  // إعداد الفرص لتضمين عدد المتقدمين
  const formattedOpportunities = opportunities.map(o => ({
    ...o,
    applicants: applications.filter(a => a.training === o.title).length,
    lastDate: new Date(o.created_at).toLocaleDateString()
  }));

  return (
    <main className="main-app" dir="rtl">
      <section className="summary-row">
        {summaryData.map(s => (
          <SummaryCard key={s.id} title={s.title} count={s.count} icon={s.icon} />
        ))}
      </section>

      <section className="content-row">
        <div className="left-column">
          <div className="panel">
            <h3 className="panel-title">الفرص المنشورة مؤخراً</h3>
            <RecentList items={formattedOpportunities} />
          </div>
        </div>

        <aside className="right-column">
          <div className="panel">
            <h3 className="panel-title">طلبات التقديم الحديثة</h3>
            <ApplicationsList items={applications} />
          </div>
        </aside>
      </section>
    </main>
  );
}
