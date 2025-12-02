import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainingCard.css";

export default function TrainingCard({
  id,  // 👈 أضفناه
  image,
  title,
  company,
  duration,
  location,
  tags,
  price,
}) {
  const navigate = useNavigate();

  const goToApply = () => {
    console.log("ID sent from card:", id);
    navigate("/apply", { 
      state: { 
        id, 
        title, 
        company,
        duration,
        location,
        price,
        tags
      } 
    });
  };
  
  return (
    <div className="opportunity-card">
      <img src={image} className="op-card-img" alt="Opportunity" />

      <div className="op-card-body">
        <h3 className="op-title">{title}</h3>
        <p className="op-company">{company}</p>
        <p className="op-info">{duration} • {location}</p>

        <div className="op-tags">
          {tags?.map((tag, i) => (
            <span key={i} className="op-tag">{tag}</span>
          ))}
        </div>

        <div className="op-bottom">
          <span className="op-price">{price} شيكل</span>

          <button className="op-apply-btn" onClick={goToApply}>
            تقدم الآن
          </button>
        </div>
      </div>
    </div>
  );
}

