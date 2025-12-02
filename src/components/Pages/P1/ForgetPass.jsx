import React, { useState } from "react";
import supabase from "../../../supabase";
import logo from "./logo.png";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setLoading(true);

    // إرسال رابط إعادة تعيين كلمة المرور
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password", // رابط صفحة RestPass
    });

    setLoading(false);

    if (error) {
      alert("حدث خطأ: " + error.message);
    } else {
      alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    }
  };

  return (
    <div style={{ direction: "rtl" }} className="login-wrapper">
      <div className="login-container">
     
        <form onSubmit={handleReset}>
        <img style={{ top: "160px" }} className="logo2" src={logo} alt="شعار الموقع" />

          <h2>استعادة كلمة المرور</h2>
            <p>ادخل بريدك الإلكتروني لتصلك التعليمات</p>

          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="login-btn">
            {loading ? "جاري الإرسال..." : "استعادة"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;

