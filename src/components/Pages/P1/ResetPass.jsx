import React, { useState } from "react";
import supabase from "../../../supabase";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

function RestPass() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // قراءة التوكين من الـ URL
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace("#", "?"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password !== confirm) {
      alert("تأكد من إدخال كلمة المرور ومطابقتها");
      return;
    }
   

    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    setLoading(false);

    if (error) {
      alert("حدث خطأ: " + error.message);
    } else {
      alert("تم تحديث كلمة المرور بنجاح");
      navigate("/login");
    }
  };

  return (
    <div style={{ direction: "rtl" }} className="login-wrapper">
      <img style={{ top: "48%" }} className="logo2" src={logo} alt="شعار الموقع" />
      <div className="login-container">
        <h2>تعيين كلمة المرور</h2>
        <p>اعد تعيين كلمة المرور الخاصة بك</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit" className="login-btn">
            {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestPass;


