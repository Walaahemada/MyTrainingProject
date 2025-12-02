import React from "react";

export default function FilterSidebar({ onFilter }) {
  return (
    <aside className="filter-sidebar">
      <h3 className="H3">تصفية النتائج</h3>

      <div className="filter-group">
        <label>القطاع</label>
        <select onChange={(e) => onFilter(e.target.value)}>
          <option value="all">جميع القطاعات</option>
          <option value="تطوير الويب">تطوير الويب</option>
          <option value="التسويق">التسويق</option>
          <option value="التصميم">التصميم</option>
        </select>
      </div>
    </aside>
  );
}

