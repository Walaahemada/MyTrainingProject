import Title from "./Title";

function S5() {
  return (
    <div
      style={{
        background: "#1b9bb7",
        color: "white",
        padding: "60px 0",
      }}
      className="how-section"
    >
      {/* العنوان والوصف */}
      <Title
        color="white"
        T1="ابدأ رحلتك المهنية اليوم"
        T2="انضم إلى آلاف الطلاب الذين بدأوا رحلتهم المهنية من خلال منصة Gaza Training Hub. سواء كنت طالباً تبحث عن فرصة تدريب أو شركة تبحث عن المواهب الشابة، نحن هنا لمساعدتك."
      />

      {/* الشبكة */}
      <div
        style={{
          color: "white",
          gap: "80px",
          display: "grid",
          justifyContent: "center",
          justifyItems: "center",
          marginTop: "40px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          padding: "0 40px",
        }}
      >
        {/* عنصر 1 */}
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              padding: "5px 10px",
              backgroundColor: "#ffffff33",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            <i className="ri-team-line"></i>
          </span>
          <div style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 5px 5px" }}>
            تواصل مباشر
          </div>
          <div>تواصل مباشر بين الطلاب والشركات</div>
        </div>

        {/* عنصر 2 */}
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              padding: "5px 10px",
              backgroundColor: "#ffffff33",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            <i className="ri-trophy-line"></i>
          </span>
          <div style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 5px 5px" }}>
            حقق النجاح
          </div>
          <div>ابني مهاراتك وحقق أهدافك المهنية</div>
        </div>

        {/* عنصر 3 */}
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              padding: "5px 10px",
              backgroundColor: "#ffffff33",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            <i className="ri-rocket-line"></i>
          </span>
          <div style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 5px 5px" }}>
            انطلق بسرعة
          </div>
          <div>إنشاء حساب سريع وسهل في دقائق معدودة</div>
        </div>
      </div>
    </div>
  );
}

export default S5;
