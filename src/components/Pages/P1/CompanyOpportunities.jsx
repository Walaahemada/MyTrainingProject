import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";

export default function CompanyOpportunities({ companyId }) {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetchCompanyOpportunities();
  }, [companyId]);

  async function fetchCompanyOpportunities() {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("company_id", companyId);

    if (error) {
      console.log("Error:", error);
    } else {
      setOpportunities(data);
    }
  }

  return (
    <div className="mt-10" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        الفرص المتاحة لدى الشركة
      </h2>

      {opportunities.length === 0 ? (
        <p className="text-gray-600">لا توجد فرص تدريب حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-3">{opp.title}</h3>

              <p className="text-gray-600 mb-2">📅 {opp.duration}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {opp.description}
              </p>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
