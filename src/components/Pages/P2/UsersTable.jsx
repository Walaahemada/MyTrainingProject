import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import DataTable from "./DataTable";
import FilterBar from "./FilterBar";
import StatusBadge from "./StatusBadge";
import { FaUser, FaBuilding } from "react-icons/fa";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // جلب البيانات من Supabase
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
  
      const { data, error } = await supabase.from("users").select("*");
  
      if (error) {
        console.error(error);
        return;
      }
  
      const formattedUsers = (data || [])
        .filter(u => u.role !== "admin")
        .map(u => ({
          id: u.id,
          name: u.full_name || "-",
          email: u.email || "-",
          type: u.role === "student" ? "طالب" : "شركة",
          status: u.status || "نشط",
          joinDate: u.join_date || "-",
          lastActivity: u.last_activity || "-",
        }));
  
      setUsers(formattedUsers);
      setLoading(false);
    };
  
    loadUsers();
  }, []);
  
  // الفلترة حسب النوع
  const filteredUsers =
    filter === "all" ? users : users.filter(u => u.type === filter);
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
    setUsers((prev) =>
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
    setUsers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "مرفوض" } : c))
    );
  }
};





  // الأعمدة
  const columns = [
    {
      title: "المستخدم",
      key: "name",
      render: (value, row) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#e8f0ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.type === "شركة" ? (
              <FaBuilding style={{ color: "#5b8def" }} />
            ) : (
              <FaUser style={{ color: "#5b8def" }} />
            )}
          </div>

          <div>
            <p style={{ margin: 0, fontWeight: "600" }}>{row.name}</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    { title: "النوع", key: "type" },
    {
      title: "الحالة",
      key: "status",
      render: (value) => <StatusBadge type={value} />,
    },
    { title: "تاريخ الانضمام", key: "joinDate" },
    { title: "آخر نشاط", key: "lastActivity" },
  ];

  if (loading) return <p>جاري تحميل البيانات...</p>;

  return (
    <div className="users-container" style={{ marginTop: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="title-header"
      >
        <h2 style={{ marginBottom: "6px" }}>قائمة المستخدمين</h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FilterBar
            options={[
              { value: "all", label: "جميع المستخدمين" },
              { value: "طالب", label: "الطلاب فقط" },
              { value: "شركة", label: "الشركات فقط" },
            ]}
            onChange={setFilter}
          />
        </div>
      </div>
  
      <DataTable
        columns={columns}
        data={filteredUsers}
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
export default UsersTable;
