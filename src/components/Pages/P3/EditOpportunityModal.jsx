import React, { useState } from "react";
import supabase from "../../../supabase";
import "./Modal.css";

export default function EditOpportunityModal({ opportunity, onClose }) {
  const [title, setTitle] = useState(opportunity.title);
  const [type, setType] = useState(opportunity.type);
  const [endDate, setEndDate] = useState(opportunity.end_date);

  const saveChanges = async () => {
    const { error } = await supabase
      .from("opportunities")
      .update({
        title,
        type,
        end_date: endDate
      })
      .eq("id", opportunity.id);

    if (error) {
      alert("حدث خطأ أثناء التعديل");
      return;
    }

    alert("تم التعديل بنجاح");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>تعديل الفرصة</h3>

        <label>العنوان</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>النوع</label>
        <input value={type} onChange={(e) => setType(e.target.value)} />

        <label>آخر موعد</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <div className="modal-actions">
          <button onClick={saveChanges}>حفظ</button>
          <button onClick={onClose}>إغلاق</button>
        </div>

      </div>
    </div>
  );
}
