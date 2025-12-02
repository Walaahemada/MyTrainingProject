import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";
import TrainingCard from "./TrainingCard";
import { BsDisplay } from "react-icons/bs";

export default function S3() {
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  const fetchOpp = async () => {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      // 👇 نخلي بس أول 3
      setOpportunities(data.slice(0, 3));
    }
  };
/* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    fetchOpp();
  }, []);

  return (
    <div style={{  background:"white", padding: "40px 0px", direction: "center" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
        أحدث فرص التدريب
      </h2>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        تعرّف على أحدث الفرص المضافة مؤخرا
      </p>

      <div className="opp-grid" style={{display: "grid",justifyContent:"center",justifyItems:"center", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",padding:"0px 80px"}}>
        {opportunities.length === 0 ? (
          <p>لا توجد فرص حاليا</p>
        ) : (
          opportunities.map((op) => (
            <TrainingCard
              key={op.id}
              id={op.id}
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

      {/* زر عرض المزيد */}
      <div className="center-btn" style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => navigate("/OppPage")}
          className="view-all"
          style={{
            padding: "10px 25px",
            borderRadius: "8px",
            background: "white",
            color: "#1b9bb7",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
       
          <i className="ri-arrow-left-line" style={{ marginLeft: "8px" }}></i>
          عرض جميع الفرص 
        </button>
      </div>
    </div>
  );
}
