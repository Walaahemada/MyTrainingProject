import React, { useState } from "react";
import Title from "./Title";
import supabase from "../../../supabase"; // غيّري المسار حسب مشروعك

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("استفسار عام");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!fullName || !email || !message) {
      alert("❌ الرجاء تعبئة الحقول المطلوبة");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      phone,
      subject,
      message,
    });

    setLoading(false);

    if (error) {
      alert("حدث خطأ أثناء إرسال الرسالة"+error.message);
      console.log(error);
    } else {
      alert("✔ تم إرسال الرسالة بنجاح!");
      setFullName("");
      setEmail("");
      setPhone("");
      setSubject("استفسار عام");
      setMessage("");
    }
  };

  return (
    <div style={{ paddingTop:"50px"}} className="contact-wrapper" dir="rtl">
      <Title bc="#1b9bb7" p="50px" color="white" T1="تواصل معنا " T2="نحن هنا لمساعدتك والإجابة على جميع استفساراتك" size="40px"/>

      <div className="top-section">
        {/* نموذج الإرسال */}
        <div className="contact-form-card">
          <h3 style={{ margin: "20px 0px", textAlign: "right" }}>أرسل لنا رسالة</h3>

          <div className="form-grid">
            <input 
              type="text" 
              placeholder="الاسم الكامل" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input 
              type="email" 
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              type="text" 
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option>استفسار عام</option>
              <option>مشكلة تقنية</option>
            </select>
          </div>

          <textarea 
            placeholder="اكتب رسالتك هنا..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button 
            style={{ background:"#1b9bb7" }} 
            className="send-btn"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "جاري الإرسال..." : "إرسال الرسالة ➜"}
          </button>
        </div>

       {/* Contact Info */}
       <div className="contact-info-card">
          <h3 style={{textAlign:"right"}}>معلومات التواصل</h3>

          <div className="info-item">
            <span style={{paddingTop:"3px",backgroundColor:"#d2f8ffb5",height:"40px",width:"40px",borderRadius:"5px",color:"#1b9bb7"}} className="icon"><i class="ri-map-pin-line text-xl text-blue-500"></i></span>
            <p style={{textAlign:"right"}}><strong>العنوان</strong><br/>غزة، فلسطين،<br/>
            شارع الثلاثيني، مقابل محطة المعسكر</p>
          </div>

          <div className="info-item">
            <span style={{paddingTop:"3px",backgroundColor:"#d2f8ffb5",height:"40px",width:"40px",borderRadius:"5px",color:"#1b9bb7"}}className="icon"><i class="ri-phone-line text-xl text-blue-500"></i></span>
            <p style={{textAlign:"right"}}><strong>الهاتف</strong><br/>+970 8 123 4567 <br/>
            +970 59 123 4567 </p>
          </div>

          <div className="info-item">
            <span style={{paddingTop:"3px",backgroundColor:"#d2f8ffb5",height:"40px",width:"40px",borderRadius:"5px",color:"#1b9bb7"}}className="icon"><i class="ri-mail-line text-xl text-blue-500"></i></span>
            <p style={{textAlign:"right"}}><strong>البريد الإلكتروني</strong><br/>info@gazatraininghub.com <br/>
            support@gazatraininghub.com  </p>
          </div>

          <div className="info-item">
            <span style={{paddingTop:"3px",backgroundColor:"#d2f8ffb5",height:"40px",width:"40px",borderRadius:"5px",color:"#1b9bb7"}} className="icon"><i class="ri-time-line text-xl text-blue-500"></i></span>
            <p style={{textAlign:"right"}}><strong>ساعات العمل</strong><br/>الأحد - الخميس: 8:00 ص - 4:00 م<br/>
            الجمعة - السبت: مغلق</p>
          </div>
          
           <hr style={{margin:"30px 1px 0px 0px", opacity:".2"}}></hr>
           <div 
  className="social-icons" 
  style={{ 
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",  // يخلي كل العناصر ع اليمين
  }}
>
  <h4 style={{ margin: "20px 0px", textAlign: "right" }}>
    تابعنا على وسائل التواصل
  </h4>

  <div style={{ display: "flex", gap: "10px" }}>
    <a style={{paddingTop:"3px",backgroundColor:"#3b82f6",height:"35px",width:"35px",borderRadius:"5px",color:"white"}} href="#">
      <i className="ri-facebook-fill"></i>
    </a>
    <a style={{paddingTop:"3px",backgroundColor:"#60a5fa",height:"35px",width:"35px",borderRadius:"5px",color:"white"}} href="#">
      <i className="ri-twitter-fill"></i>
    </a>
    <a style={{paddingTop:"3px",backgroundColor:"#1d4ed8",height:"35px",width:"35px",borderRadius:"5px",color:"white"}} href="#">
      <i className="ri-linkedin-fill"></i>
    </a>
    <a style={{paddingTop:"3px",backgroundColor:"#ec4899",height:"35px",width:"35px",borderRadius:"5px",color:"white"}} href="#">
      <i className="ri-instagram-line"></i>
    </a>
  </div>
</div>

        </div>

      
      </div>

      {/* --- Location --- */}
      <div className="map-section">
        <h2 style={{ margin: "20px 50px", textAlign: "right" }} >موقعنا</h2>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.4685695397!2d34.456!3d31.501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z31LisDUwJzAzLjYiTiAzNMKwMjcnMjEuNiJF!5e0!3m2!1sar!2s!4v1705688899999"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>الأسئلة الشائعة</h3>

        <div className="faq-grid">
          <div className="faq-box">كيف يمكنني التسجيل في المنصة؟</div>
          <div className="faq-box">هل الخدمة مدفوعة؟</div>
          <div className="faq-box">ما هي متطلبات التقديم للفرص؟</div>
          <div className="faq-box">كيف يتم تقييم الشركات عند نشر فرص التدريب؟</div>
        </div>
      </div>
    </div>
  );
}



