import React from "react";

const Sidebar = ({ activeSection, onSectionChange, sections, T = "لوحة الادارة", X = "ri-shield-user-line", menuOpen }) => {

  const defaultSections = ["نظرة عامة", "إدارة المستخدمين", "إدارة الفرص", "طلبات الشركات", "الاشعارات","التقارير"];
  const menuSections = sections || defaultSections;

  return (
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
      
      <div style={{ display:"flex", justifyContent:"flex-end", paddingRight:"0" }}>
        <div>
          <h2 className="hidden" style={{ fontSize:"20px", marginBottom:"1px", marginTop:"5px" }}>{T}</h2>
          <p className="hidden" style={{ marginTop:"0" }}>تدريبي</p>
        </div>

        <div className="ava"style={{
          marginLeft:"10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          width: "50px",
          borderRadius: "10px",
          backgroundColor:"#1b9bb7"
        }}>
          <i style={{ fontSize: "25px", color: "white" }} className={X}></i>
        </div>
      </div>

      <hr style={{ marginBottom:"20px", marginTop:"20px", borderTop: ".3px solid #eaeaea" }} />

      <nav className="menu flex flex-col">
  {menuSections.map((section) => (
    <a
      key={section}
      className={`menu-item flex items-center gap-2 ${activeSection === section ? "active" : ""}`}
      onClick={() => onSectionChange(section)}
    >
      {/* النص يختفي في الشاشات الصغيرة */}
      <span className="hidden">{section}</span>
      {/* الإيقون يبقى دائماً */}
      <i className="ri-dashboard-line text-lg"></i>
    </a>
  ))}
</nav>

    </aside>
  );
};

export default Sidebar;

