import React from "react";


function StatCard({ title, value, icon="ri-user-line text-2xl ", percentage, status ,BC,C}) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  width: "50px",
  borderRadius: "10px",
  backgroundColor: BC}}className="stat-card-icon" >
      <i style={{  fontSize: "25px", color: C  }}className={icon}></i>
      </div>
      <div className="stat-card-info">
        <p className="stat-card-title">{title}</p>
        <h2 className="stat-card-value">{value}</h2>
        {percentage && (
          <p className={`stat-card-percentage ${status}`}>
            {percentage} {status === "up" ? "↑" : "↓"}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;
