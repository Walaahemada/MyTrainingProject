import React from "react";
import "./CompanyCard.css";

export default function CompanyCard({ id, logo, name, sector, size, description, website, address }) {
  return (
    <div className="company-card">
  
  <div className="company-header">
    <img 
      src={logo || "/company.png"} 
      className="company-logo" 
      alt="Logo" 
    />

    <div>
      <h6 className="company-name">{name}</h6>
      <p className="company-sector">{sector}</p>
    </div>
  </div>

  <p className="company-size"><span style={{color:"black"}}>حجم الشركة:</span>  {size}</p>

  <p className="company-desc">
    {description?.slice(0, 200)}
  </p>
  {website && (
    <a href={website} target="_blank" className="company-website">
      زيارة الموقع
    </a>
  )}

</div>

  );
}
