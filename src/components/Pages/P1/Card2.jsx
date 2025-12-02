import officeBg from "./office-bg.jpg";
function Card2({ico="🛡️",x="استوديو التطبيقات",y="تطوير التطبيقات",z="استوديو متخصص في تطوير تطبيقات الهواتف الذكية",StafiN="15-30",PaN="10 فرصة"}) {
    return (
        <div class="card">
        <div style={{display:"flex",flexDirection:"row",gap:"5px",right:"0px"}} class="card-header">
          
          <div>
          <h3>{x} </h3>
          <p class="field">{y} </p>
          </div>
          <img src={officeBg} alt="logo"/>
        </div>
        <p class="desc"> {z}   </p>
        <div class="info">
          <div style={{display:"flex",justifyContent:"space-between"}} >  <div> {StafiN}</div>:عدد الموظفين      </div>
        
          <div style={{display:"flex",justifyContent:"space-between"}} >{PaN}<div>:فرص التدريب</div>        </div>
        </div>
        <button style={{width:"100%"}}>عرض الفرص</button>
      </div>
      
      
    );
  }
  
  export default Card2;






   