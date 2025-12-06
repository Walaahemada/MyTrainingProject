import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";
import logo from "./logo.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("يرجى ملء البريد وكلمة المرور");
      return;
    }

    setLoading(true);

    // تسجيل الدخول
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("خطأ في تسجيل الدخول: " + error.message);
      return;
    }

    // جلب بيانات المستخدم من جدول users بناءً على user.id
    const userId = data.user.id;

    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userError || !userRow) {
      alert("تعذر جلب بيانات المستخدم!");
      return;
    }

    const role = userRow.role;

    // التوجيه حسب الدور
    if (role === "admin") {
      navigate("/layout"); // واجهة الأدمن
    } else if (role === "company") {
      navigate("/layout1"); // واجهة الشركة
    } else if (role === "student") {
      navigate("/"); // واجهة الطالب
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ direction: "rtl",margin:"" }} className="login-wrapper">

      <div className="login-container">
      <img style={{paddingBottom:"60px",top:"156px" }} className="logo2" src={logo} alt="شعار الموقع" />
   
   
        <h2>تسجيل الدخول</h2>
        <p>ادخل إلى حسابك للوصول إلى جميع الميزات</p>

        <form onSubmit={handleLogin}>
        

          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">تذكرني</label>
            </div>
            <button
              style={{ background: "white", color: "#1b9bb7" }}
              type="button"
              className="forget-btn"
              onClick={() => navigate("/forget-password")}
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <button type="submit" className="login-btn">
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <div className="signup">
            <span>ليس لديك حساب؟</span>
            <button
              style={{ background: "white", color: "#1b9bb7" }}
              type="button"
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              إنشاء حساب جديد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
