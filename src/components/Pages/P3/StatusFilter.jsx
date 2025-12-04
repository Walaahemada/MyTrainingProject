import React from "react";


const StatusFilter = ({ filters = ["الكل", "في الانتظار", "موافق عليه","مرفوض"],activeFilter, onFilterChange }) => {
 

  return (
    <div  className="StatusFilter"style={{background:"white" ,height:"50px",marginBottom:"50pX" }}>
    <div style={{background:"white" ,justifyContent:"start",padding:"20px" }}className="status-filter">
      {filters.map((filter) => (
        <button 
        style={{
            backgroundColor: activeFilter === filter ? "#1b9bb7" : "transparent",
            color: activeFilter === filter ? "white" : "#333333b8",
            
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          key={filter}
          className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
   </div>
  );
};

export default StatusFilter;


