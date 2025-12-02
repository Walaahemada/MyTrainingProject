import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import SummaryCard from "./SummaryCard";
import StatusFilter from "./StatusFilter";
import OpportunitiesList from "./OpportunitiesList";
import EditOpportunityModal from "./EditOpportunityModal";

export default function Opport() {
  const [opportunities, setOpportunities] = useState([]);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [loading, setLoading] = useState(true);
  const summaryData = [
    { id: 1, title: "إجمالي الفرص ", count: 0, icon: <i className="ri-briefcase-line text-blue-600 text-xl"></i> },
    { id: 2, title: "اجمالي المتقدمين", count: 0, icon: <i className="ri-user-line text-green-600 text-xl"></i> },
    { id: 3, title: "في الانتظار ", count: 0, icon: <i className="ri-time-line text-purple-600 text-xl"></i> },
    { id: 4, title: "موافق عليه ", count: 0,  icon: <i className="ri-check-line text-emerald-600 text-xl"></i> },
  ];

  // من أجل التعديل
  const [selectedOpp, setSelectedOpp] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("company_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setOpportunities(data);
      setLoading(false);
    };

    fetchOpportunities();
  }, []);

  // 🗑 حذف الفرصة
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الفرصة؟")) return;

    const { error } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", id);

    if (error) {
      alert("حدث خطأ أثناء الحذف");
      return;
    }

    // احذفيها من الواجهة
    setOpportunities(prev => prev.filter(o => o.id !== id));
  };

  // ✏ فتح شاشة التعديل
  const handleEdit = (opp) => {
    setSelectedOpp(opp);
  };

  const filteredOpportunities = activeFilter === "الكل"
    ? opportunities
    : opportunities.filter(o => o.status === activeFilter);
// تحديث عداد الملخص
summaryData[0].count = opportunities.length;
summaryData[2].count = opportunities.filter(o => o.status === "في الانتظار").length;
summaryData[3].count = opportunities.filter(o => o.status === "موافق عليه").length;
  return (
    <main className="main-app" dir="rtl">
       <section className="summary-row" aria-label="Summary cards">
        {summaryData.map((s) => (
          <SummaryCard
            key={s.id}
            title={s.title}
            count={s.count}
            icon={s.icon}
          />
        ))}
      </section>

      <StatusFilter 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {loading ? (
        <p>جارٍ تحميل البيانات...</p>
      ) : (
        <OpportunitiesList 
          opportunities={filteredOpportunities}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {selectedOpp && (
        <EditOpportunityModal
          opportunity={selectedOpp}
          onClose={() => setSelectedOpp(null)}
        />
      )}

    </main>
  );
}
