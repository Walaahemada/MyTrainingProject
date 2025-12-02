import React from "react";
import "./StudentCard.css";

export default function StudentCard({
  student,
  opportunity,
  status,
  created_at,
  onAccept,
  onReject
}) {
  return (
    <div className="student-card">
      
      <div className="student-header">
        <div>
          <h3 className="student-name">{student?.full_name}</h3>
          <p className="student-date">تاريخ التقديم: {new Date(created_at).toLocaleDateString()}</p>
        </div>

        <span className={`status-badge ${status}`}>
          {status}
        </span>
      </div>

      <div className="student-info">
        <p><strong>الفرصة:</strong> {opportunity?.title}</p>
        <p><strong>نوع الفرصة:</strong> {opportunity?.type}</p>
        <p><strong>آخر موعد:</strong> {opportunity?.end_date}</p>
      </div>

      <div className="student-actions">
        <button 
          className="accept-btn"
          onClick={onAccept}
          disabled={status === "مقبول"}
        >
          قبول
        </button>

        <button 
          className="reject-btn"
          onClick={onReject}
          disabled={status === "مرفوض"}
        >
          رفض
        </button>
      </div>

    </div>
  );
}
