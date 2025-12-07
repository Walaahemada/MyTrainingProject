import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import UsersTable from "./UsersTable";
import OpportunitiesTable from "./OpportunitiesTable";
import CompanyTable from "./CompanyTable";
import Reports from "./Reports";
import AdminNotifications from "./AdminNotifications";


function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("نظرة عامة");
  const mySections = [
    { name: "نظرة عامة", icon: "ri-dashboard-line text-lg" },
    { name: "إدارة المستخدمين", icon: "ri-user-line text-lg" },
    { name: "إدارة الفرص", icon: "ri-briefcase-line text-lg" },
    { name:"طلبات الشركات", icon: "ri-building-4-line" },
    { name:"الاشعارات", icon: "ri-notification-line text-gray-600" },
    { name:"التقارير", icon: "ri-file-list-line text-2xl" },
  ];
  return (
    <div className="page">

      <Sidebar activeSection={activeSection}
       onSectionChange={setActiveSection}
        menuOpen={menuOpen} 
        sections={mySections}/>


      <div className="main-section">
        <Topbar title={activeSection} />
        <main className="mainC">
          {activeSection === "نظرة عامة" && <div ><Overview/></div>}
          {activeSection === "إدارة المستخدمين" && <div> <UsersTable/> </div>}
          {activeSection === "إدارة الفرص" && <div><OpportunitiesTable/> </div>}
          {activeSection === "طلبات الشركات" && <div><CompanyTable/>  </div>}
          {activeSection === "الاشعارات" && <div><AdminNotifications/> </div>}
          {activeSection === "التقارير" && <div><Reports/> </div>}
        </main>
      </div>
    </div>
  );
}

export default Layout;

  
  
  
