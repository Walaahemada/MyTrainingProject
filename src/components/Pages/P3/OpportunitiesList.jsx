import React from "react";
import StatusBadge from "../P2/StatusBadge";

const OpportunitiesList = ({ opportunities, onDelete, onEdit }) => {
  return (
    <div className="opportunities-container">
      <table className="opportunities-table">
        <thead>
          <tr>
            <th>العنوان</th>
            <th>النوع</th>
            <th>الحالة</th>
            <th>المتقدمين</th>
            <th>آخر موعد</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td><span className="type-badge">{item.type}</span></td>
              <td><StatusBadge type={item.status} /></td>
              <td>{item.applicants}</td>
              <td>{item.end_date}</td>

              <td>
                <div className="actions">
                  
                  {/* تعديل */}
                  <button
                    style={{ background: "white", color: "#16a34a" }}
                    title="تعديل"
                    onClick={() => onEdit(item)}
                  >
                    <i className="ri-edit-line"></i>
                  </button>

                  {/* حذف */}
                  <button
                    style={{ background: "white", color: "red" }}
                    title="حذف"
                    onClick={() => onDelete(item.id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunitiesList;

