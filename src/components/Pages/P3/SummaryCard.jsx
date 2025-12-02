import React from "react";

export default function SummaryCard({ title, count, change, icon ,x}) {
  return (
    <div className="summary-card" role="group" aria-label={title}>
      <div className="summary-left">
        <div className="summary-icon" aria-hidden>
          {icon}
        </div>
      </div>
      <div className="summary-right">
        <div className="summary-title">{title}</div>
        <div className="summary-count">{count}</div>
        <div className="summary-change">{change}{x} </div>
      </div>
    </div>
  );
}
