import React from "react";

function AppStatus({ status }) {
  const cls =
    status === "مقبول"
      ? "app-pill app-pill-green"
      : status === "قيد المراجعة"
      ? "app-pill app-pill-yellow"
      : "app-pill app-pill-gray";
  return <span className={cls}>{status}</span>;
}

export default function ApplicationsList({ items = [] }) {
  return (
    <div style={{textAlign:"start",margin:"15px 6px"}}className="applications-list">
      {items.map((it) => (
        <div className="application-card" key={it.id}>
          <div className="app-row">
            <div className="app-left">
              <div className="app-name">{it.name}</div>
              <div className="app-uni">{it.uni}</div>
              <a className="app-training" href="#" onClick={(e)=>e.preventDefault()}>
                {it.training}
              </a>
            </div>
            <div className="app-right">
              <AppStatus status={it.status} />
              <div className="app-date">{it.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
