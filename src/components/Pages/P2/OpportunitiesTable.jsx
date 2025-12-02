import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import DataTable from "./DataTable";
import FilterBar from "./FilterBar";
import StatusBadge from "./StatusBadge";

const OpportunitiesTable = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // جلب الفرص مع بيانات الشركة
  const fetchOpportunities = async () => {
    setLoading(true);

    const { data: oppData, error: oppError } = await supabase
      .from("opportunities")
      .select("*");

    if (oppError) {
      console.error("Error fetching opportunities:", oppError);
      setLoading(false);
      return;
    }

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, company_name");

    if (usersError) {
      console.error("Error fetching users:", usersError);
      setLoading(false);
      return;
    }

    const formatted = oppData.map(o => {
      const company = usersData.find(u => u.id === o.company_id);
      return {
        ...o,
        company: company?.company_name || "-",
      };
    });

    setOpportunities(formatted);
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // فلترة الفرص حسب الحالة
  const filteredList =
    filter === "all"
      ? opportunities
      : opportunities.filter(o => o.status === filter);

  // دوال الإجراءات
  const handleView = (opportunity) => {
    alert(`عرض بيانات الفرصة: ${opportunity.title}`);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from("opportunities")
      .update({ status: "موافق عليه" })
      .eq("id", id);

    if (!error) {
      setOpportunities(prev =>
        prev.map(o => (o.id === id ? { ...o, status: "موافق عليه" } : o))
      );
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase
      .from("opportunities")
      .update({ status: "مرفوض" })
      .eq("id", id);

    if (!error) {
      setOpportunities(prev =>
        prev.map(o => (o.id === id ? { ...o, status: "مرفوض" } : o))
      );
    }
  };

  // الأعمدة
  const columns = [
    { title: "الفرصة", key: "title" },
    { title: "الشركة", key: "company" },
    { title: "الحالة", key: "status", render: (value) => <StatusBadge type={value} /> },
    { title: "المتقدمين", key: "applicants" },
    { title: "تاريخ النشر", key: "publishdate" },
    { title: "الموعد النهائي", key: "deadline" },
  ];

  if (loading) return <p>جارٍ تحميل الفرص...</p>;

  return (
    <div style={{ marginTop: "20px" }} className="users-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title-header">
          <h2>إدارة الفرص</h2>
        </div>
        <div>
          <FilterBar
            options={[
              { value: "all", label: "جميع الفرص" },
              { value: "موافق عليه", label: "موافق عليه" },
              { value: "مرفوض", label: "مرفوض" },
              { value: "في الانتظار", label: "في الانتظار" },
            ]}
            onChange={setFilter}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredList}
        actions={["عرض", "موافقة", "رفض"]}
        onActionClick={(action, row) => {
          if (action === "عرض") handleView(row);
          if (action === "موافقة") handleApprove(row.id);
          if (action === "رفض") handleReject(row.id);
        }}
      />
    </div>
  );
};

export default OpportunitiesTable;

