import React, { useState } from "react";
import Topbar from "../P2/Topbar";
import Sidebar from "../P2/Sidebar";
import Overview from "../P2/Overview";
import UsersTable from "../P2/UsersTable";
import OpportunitiesTable from "../P2/OpportunitiesTable";
import CompanyTable from "../P2/CompanyTable";
import Reports from "../P2/Reports";
import Main from "../P3/Main";
import Opport from "../P3/Opport";
import AddOpportunity from "../P3/AddOpportunity";
import StudentsR from "../P3/StudentsR";
import ProfileEditForm from "../P2/ProfileEditForm";

function Layout1() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("الرئيسية");

  // لحماية المودال
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const mySections = [
    "الرئيسية",
    "إدارة الفرص ",
    "نشر فرصة تدريب جديدة",
    "طلبات الطلاب",
    "إعدادات الملف الشخصي"
  ];

  // دالة عند تغيير القسم من السايدبار
  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (section === "إعدادات الملف الشخصي") {
      setShowProfileEdit(true);
    }
  };

  return (
    <div className="page">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        menuOpen={menuOpen}
        sections={mySections}
        T="لوحة الشركات"
        X="ri-building-line text-white text-lg"
      />

      <div className="main-section">
        <Topbar
          title={activeSection}
          // هان بندعم التوب بار إنه يفتح المودال لما يضغط تعديل
          onOpenProfileEdit={() => setShowProfileEdit(true)}
        />

        <main className="mainC">

          {activeSection === "الرئيسية" && <Main />}
          {activeSection === "إدارة الفرص " && <Opport />}
          {activeSection === "نشر فرصة تدريب جديدة" && <AddOpportunity />}
          {activeSection === "طلبات الطلاب" && <StudentsR />}

          {/* عرض نافذة تعديل الملف الشخصي */}
          {showProfileEdit && (
            <ProfileEditForm onClose={() => setShowProfileEdit(false)} />
          )}

        </main>
      </div>
    </div>
  );
}

export default Layout1;


  
  
  
