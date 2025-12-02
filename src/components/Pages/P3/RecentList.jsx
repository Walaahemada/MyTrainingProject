import React from "react";

function StatusPill({ status }) {
  const cls =
    status === "نشط"
      ? "pill pill-green"
      : status === "قيد المراجعة"
      ? "pill pill-yellow"
      : "pill pill-gray";
  return <span className={cls}>{status}</span>;
}

export default function RecentList({ items = [] }) {
  return (
    <div style={{textAlign:"start",margin:"15px 6px"}}className="recent-list">
      {items.map((it) => (
        <div className="recent-item" key={it.id}>
            <div className="recent-body">
            <div className="recent-title">{it.title}</div>
            <div className="recent-sub">{it.type} • آخر موعد: {it.lastDate}</div>
          </div>
          <div className="recent-left">
            <StatusPill status={it.status} />
            <div className="recent-meta">{it.applicants} متقدّم</div>
          </div>

        
        </div>
      ))}
    </div>
  );
}
