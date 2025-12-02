import Card from "./Card";
import Title from "./Title";

function S2() {
  return (
    <div className="how-section">
      <Title/>
      <div className="cards-container">
        <Card 
          ico="ri-shield-check-line" 
          x="آمن وموثوق" 
          y="منصة آمنة ومراقبة لضمان جودة الفرص وحماية بيانات المستخدمين" 
          a="مراجعة الفرص" 
          b="حماية البيانات"
          c="دعم فني متواصل"
          d="ضمان الجودة"
        />
        <Card 
          ico="ri-building-line" 
          x="للشركات" 
          y="منصة آمنة ومراقبة لضمان جودة الفرص وحماية بيانات المستخدمين" 
          a="مراجعة الفرص" 
          b="حماية البيانات"
          c="دعم فني متواصل"
          d="ضمان الجودة"
        />
        <Card 
          ico="ri-user-line" 
          x="للطلاب" 
          y="منصة آمنة ومراقبة لضمان جودة الفرص وحماية بيانات المستخدمين" 
          a="مراجعة الفرص" 
          b="حماية البيانات"
          c="دعم فني متواصل"
          d="ضمان الجودة"
        />
      </div>
    </div>
  );
}

export default S2;
