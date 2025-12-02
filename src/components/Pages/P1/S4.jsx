
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";
import CompanyCard from "./CompanyCard";


function S4() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "company")
      .order("company_name", { ascending: true });

    if (!error) {
      // 👇 نخلي بس أول 3 شركات لعرضهم في اللاندنغ
      setCompanies(data.slice(0, 3));
    }
  };
/* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div style={{ padding: "60px 0", direction: "rtl" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
        أبرز الشركات
      </h2>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        اكتشف أفضل الشركات المسجلة لدينا
      </p>

      {/* شبكة الكروت */}
      <div
        className="companies-grid"
        style={{
          display: "grid",
          justifyContent:"center",
          justifyItems:"center",
      
           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",padding:"0px 60px"
        }}
      >
        {companies.length === 0 ? (
          <p>لا توجد شركات حاليا</p>
        ) : (
          companies.map((company) => (
            <CompanyCard 
            w={"400px"}
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

      {/* زر عرض المزيد */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => navigate("/CompanyPage")}
          style={{
        
            padding: "10px 25px",
           
            background: "#f3f6fa",
            color: "#1b9bb7",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
             عرض جميع الشركات
          <i className="ri-arrow-left-line" style={{ marginLeft: "8px" }}></i>
       
        </button>
      </div>
    </div>
  );
}

  
  export default S4;