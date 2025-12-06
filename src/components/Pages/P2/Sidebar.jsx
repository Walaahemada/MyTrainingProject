import React from "react";

const Sidebar = ({ activeSection, onSectionChange, sections, T = "لوحة الادارة", X = "ri-shield-user-line", menuOpen }) => {

 
  const menuSections = sections || defaultSections;
  const defaultSections = [
    { name: "نظرة عامة", icon: "ri-home-3-line" },
    { name: "إدارة المستخدمين", icon: "ri-briefcase-line" },
    { name: "إدارة الفرص", icon: "ri-building-4-line" },
    { name:"طلبات الشركات", icon: "ri-information-line" },
    { name:"الاشعارات", icon: "ri-information-line" },
    { name:"التقارير", icon: "ri-information-line" },
  ];

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
      key={section.name}
      className={`menu-item flex items-center gap-2 ${activeSection === section.name ? "active" : ""}`}
      onClick={() => onSectionChange(section.name)}
    >
      {/* النص يختفي في الشاشات الصغيرة */}
      <span style={{marginRight:"10px"}}className="hidden">{section.name}</span>
      {/* الإيقون يبقى دائماً */}
      <i className={section.icon}></i>
    </a>
  ))}
</nav>

    </aside>
  );
};

export default Sidebar;

