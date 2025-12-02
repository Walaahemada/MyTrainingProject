import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import CompanyCard from "./CompanyCard";
import "./CompaniesPage.css";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "company")   // 👈 مهم جداً
      .order("company_name", { ascending: true });

    if (error) {
      console.error("خطأ في جلب الشركات:", error);
    } else {
      setCompanies(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filtered = companies.filter((c) =>
    c.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="CompaniesPage" style={{ padding: "100px 60px", direction: "rtl" }}>
      <h1>الشركات</h1>
      <p>استكشف أفضل الشركات في غزة وتعرّف على مجالات عملها</p>

      <input
        type="text"
        placeholder="ابحث عن شركة..."
        className="company-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="companies-grid">
        {loading ? (
          <p>جاري التحميل...</p>
        ) : filtered.length === 0 ? (
          <p>لا توجد شركات مطابقة.</p>
        ) : (
          filtered.map((company) => (
            <CompanyCard
              key={company.id}
              id={company.id}
              logo={company.logo}
              name={company.company_name}
              sector={company.sector}
              size={company.size}
              description={company.description}
              website={company.website}
              address={company.address}
            />
          ))
        )}
      </div>
    </div>
  );
}
