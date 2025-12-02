import React, { useEffect, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import TrainingCard from "./TrainingCard";
import Title from "./Title";
import supabase from "../../../supabase";
import "./OppPage.css"

export default function OppPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // جلب الفرص من Supabase
  const fetchOpportunities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("خطأ في جلب الفرص:", error);
    } else {
      setOpportunities(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // تصفية الفرص حسب البحث
  const filteredOpportunities = opportunities.filter(
    (op) =>
      op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (op.company_name && op.company_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="OppPage" style={{display: "flex", flexDirection: "column", gap: "20px", direction: "rtl", padding: "100px 60px" }}>
      
      {/* القسم العلوي مع العنوان وصندوق البحث */}
      <h1>فرص التدريب المتاحة</h1>
      <p>اكتشف أفضل فرص التدريب في غزة وابدأ رحلتك المهنية</p>
       

      {/* قائمة الفرص والفلتر */}
    
      <div className="opp-grid" style={{ flex: 3 }}>
  {loading ? (
    <p>جاري التحميل...</p>
  ) : filteredOpportunities.length === 0 ? (
    <p>لا توجد فرص متاحة حاليا.</p>
  ) : (
    filteredOpportunities.map((op) => (
      <TrainingCard
        key={op.id}
        id={op.id}              // 👈 أهم سطر! لازم ينضاف
        image={op.image}
        title={op.title}
        company={op.company_name}
        duration={op.duration}
        location={op.location}
        tags={op.skills?.split(",")}
        price={op.price}
      />
    ))
    
  )}
</div>


        <div style={{ flex: 1 }}>
  
        </div>
      </div>

  );
}



