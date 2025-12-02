import React from "react";

const Sidebar = ({ activeSection, onSectionChange, sections ,T="لوحة الادارة",X="ri-shield-user-line"}) => {
  // إذا ما أرسلتِ sections، نستخدم الافتراضي
  const defaultSections = ["نظرة عامة", "إدارة المستخدمين", "إدارة الفرص", "طلبات الشركات", "الاشعارات","التقارير"];
  const menuSections = sections || defaultSections;

  return (
    <aside className="sidebar">
      <div style={{ display:"flex", justifyContent:"flex-end", gap:"12px", paddingRight:"0" }}>
        <div>
          <h2 style={{ fontSize:"20px", marginBottom:"1px", marginTop:"5px" }}>{T} </h2>
          <p style={{ marginTop:"0" }}>تدريبي</p>
        </div>
        <div style={{
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

      <nav className="menu">
        {menuSections.map((section) => (
          <a 
            key={section}
            className={`menu-item ${activeSection === section ? "active" : ""}`}
            onClick={() => onSectionChange(section)}
          >
            {section}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
