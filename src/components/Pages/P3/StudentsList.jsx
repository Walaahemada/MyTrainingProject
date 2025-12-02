import React from "react";
import StudentCard from "./StudentCard";

export default function StudentsList({ applications, updateStatus }) {
  return (
    <div className="students-list">
      {applications.map((item) => (
        <StudentCard
          key={item.id}
          student={item.student}
          opportunity={item.opportunity}
          status={item.status}
          created_at={item.created_at}

          onAccept={() =>
            updateStatus(item.id, "مقبول", item.student_id, item.opportunity.title)
          }

          onReject={() =>
            updateStatus(item.id, "مرفوض", item.student_id, item.opportunity.title)
          }
        />
      ))}
    </div>
  );
}
