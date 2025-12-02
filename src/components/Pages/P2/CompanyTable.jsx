import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import DataTable from "./DataTable";
import FilterBar from "./FilterBar";
import StatusBadge from "./StatusBadge";

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // جلب الشركات من Supabase
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "company"); // فقط الشركات

      if (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      } else {
        setCompanies(data ?? []);
      }

      setLoading(false);
    };

    fetchCompanies();
  }, []);

  // الفلترة حسب الحالة
  const filteredList =
    filter === "all"
      ? companies
      : companies.filter((c) => (c.status || "في الانتظار") === filter);

  // دوال الإجراءات
  const handleView = (company) => {
    alert(`عرض بيانات الشركة: ${company.company_name}`);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from("users")
      .update({ status: "موافق عليه" })
      .eq("id", id);
    if (!error) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "موافق عليه" } : c))
      );
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase
      .from("users")
      .update({ status: "مرفوض" })
      .eq("id", id);
    if (!error) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "مرفوض" } : c))
      );
    }
  };

  // أعمدة الجدول
  const columns = [
    { title: "اسم الشركة", key: "company_name" },
    { title: "الشخص المسؤول", key: "full_name" },
    { title: "البريد الإلكتروني", key: "email" },
    { title: "القطاع", key: "sector" },
    { title: "تاريخ الطلب", key: "created_at" },
    {
      title: "الحالة",
      key: "status",
      render: (value) => <StatusBadge type={value || "في الانتظار"} />,
    },
  ];

  if (loading) return <p>جارٍ تحميل طلبات الشركات...</p>;

  return (
    <div style={{ marginTop: "20px" }} className="users-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title-header">
          <h2 style={{ marginBottom: "25px" }}>طلبات انضمام الشركات</h2>
        </div>

        <div>
          <FilterBar
            options={[
              { value: "all", label: "جميع الشركات" },
              { value: "في الانتظار", label: "في الانتظار" },
              { value: "موافق عليه", label: "موافق عليه" },
              { value: "مرفوض", label: "مرفوض" },
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

export default CompanyTable;

