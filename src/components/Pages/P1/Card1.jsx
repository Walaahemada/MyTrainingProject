import officeBg from "./office-bg.jpg";

function Card1({x=" محلل بيانات",y="الشركة الفلسطينية للتكنولوجيا",z="900 ₪"}) {
    return (
      
        <div className="training-card">
          <img src={officeBg} alt="محلل بيانات" />
          <div className="training-info">
            <h3>{x} </h3>
            <p>{y}  </p>
            <span className="price"> {z}</span>
            <button>قدّم الآن</button>
          </div>
        </div>
      
    );
  }
  
  export default Card1;
  
 














