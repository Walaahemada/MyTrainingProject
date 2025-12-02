
import Card from "./Card";
function Title({children,bc="",p="", size="",color = '',T1="كيف تعمل المنصة" ,T2="منصة شاملة تجمع بين الطلاب والشركات في بيئة آمنة وموثوقة لتحقيق أفضل النتائج للجميع"}) {
    return (
      <div style={{backgroundColor:bc,padding:p,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2 style={{ color: color,fontSize:size }}>{T1}  </h2>
      <p style={{width:"80%", color: color }} className="subtitle">{T2} </p>
      {children}
      </div>
    );
  }
  
  export default Title;