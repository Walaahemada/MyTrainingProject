import React from "react";


export default function FilterSidebar({x="نوع التدريب", x1="جميع الانواع",x2="تطوير الويب",x3="التسويق",x4="التصميم",y="الموقع",y1="غزة",y2="رفح",y3="اونلاين",z="المجالات الشائعة"}) {
  return (
    <aside className="filter-sidebar">
    
        <h3 className="H3" >تصفية النتائج</h3>

        {/* نوع التدريب */}
        <div className="filter-group">
          <label>{x} </label>
          <select style={{textAlign:"right"}}>
            <option>{x1} </option>
            <option>{x2} </option>
            <option>{x3}</option>
            <option>{x4}</option>
          </select>
        </div>

        {/* الموقع */}
        <div className="filter-group">
          <label>{y}</label>
          <select style={{textAlign:"right"}}>
            <option>جميع {y}</option>
            <option>{y1}</option>
            <option>{y2}</option>
            <option>{y3}</option>
          </select>
        </div>

        {/* المجالات الشائعة */}
        <div className="filter-group">
          <label style={{margin:"5px 0px"}}> {z}</label>
          <div className="checkbox-group">
            <label>تكنولوجيا المعلومات<input type="checkbox" /> </label>
            <label>التسويق<input type="checkbox" /> </label>
            <label>التصميم<input type="checkbox" /> </label>
            <label>المحاسبة<input type="checkbox" /> </label>
            <label>الهندسة<input type="checkbox" /> </label>
          </div>
        </div>
   
    </aside>
  );
}

