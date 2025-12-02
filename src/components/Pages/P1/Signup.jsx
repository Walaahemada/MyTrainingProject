import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabase";
import logo from "./logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("student");

  // الحقول المشتركة
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  // حقول الطالب
  const [university, setUniversity] = useState("الجامعة الاسلامية");
  const [specialization, setSpecialization] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");

  // حقول الشركة
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companySector, setCompanySector] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const sendAdminNotification = async ({ title, message }) => {
    const ADMIN_ID = "4fbbe0aa-e204-4e45-9c2f-650172de16f6"; // ضع ID الأدمن
  
    const { error } = await supabase.from("notifications").insert([
      {
        user_id: ADMIN_ID,
        title,
        message,
        is_read: false,
      },
    ]);
  
    if (error) console.error("خطأ في إرسال الإشعار:", error);
  };
  
  
  
  
  
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("يرجى ملء الحقول المطلوبة!");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    if (!agree) {
      alert("يجب الموافقة على الشروط والأحكام");
      return;
    }

    // إنشاء الحساب في Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    const userId = authData.user.id;

    // إنشاء سجل أساسي في جدول users
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: userId,
        full_name: fullName,
        email: email,
        phone: phone,
        role: accountType,
        status: "pending", // الشركة ممكن تكون بانتظار الموافقة
      },
    ]);

    if (dbError) {
      alert("حدث خطأ أثناء حفظ البيانات: " + dbError.message);
      return;
    }

    // حفظ بيانات الطالب
    if (accountType === "student") {
      const { error: studentError } = await supabase
        .from("users")
        .update({
          university,
          major: specialization,
          graduation_year: graduationYear,
        })
        .eq("id", userId);

      if (studentError) {
        alert("حدث خطأ أثناء حفظ بيانات الطالب: " + studentError.message);
        return;
      }
       // بعد الحفظ في users
  await sendAdminNotification({
    title: "طالب جديد",
    message: `تم تسجيل الطالب ${fullName} بنجاح`
  });
    }

    // حفظ بيانات الشركة
    if (accountType === "company") {
      const { error: companyError } = await supabase
        .from("users")
        .update({
          company_name: companyName,
          size: companySize,
          sector: companySector,
          website: companyWebsite,
        })
        .eq("id", userId);

      if (companyError) {
        alert("حدث خطأ أثناء حفظ بيانات الشركة: " + companyError.message);
        return;
      }
      if (accountType === "company") {
        await sendAdminNotification({
          title: "شركة جديدة",
          message: `تم تسجيل الشركة ${companyName} بنجاح`
        });
      }
      
    }

    alert("تم إنشاء الحساب بنجاح! تحقق من بريدك لتفعيل الحساب");
    navigate("/login");
  };

  return (
<div  style={{margin:"30px 0px"}} className="signup-container">

  <form style={{position:"relative"}} className="signup-form" onSubmit={handleSignup}>
  <img  style={{top:"150px",position:"absolute"}}className="logo2" src={logo} alt="شعار الموقع" />

    <h2 style={{margin:"10px 20px 0px"}}>إنشاء حساب</h2>
    <p>انضم إلى منصة تدريبي وابدأ رحلتك المهنية</p>

    <div className="form-group full-width">
      <label>نوع الحساب</label>
      <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="student">طالب</option>
        <option value="company">شركة</option>
      </select>
    </div>

    {/* الحقول المشتركة */}
    <div className="form-row">
      <div className="form-group">
        <label>البريد الإلكتروني</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label>الاسم الكامل / اسم المسؤول</label>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>كلمة المرور</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="form-group">
        <label>تأكيد كلمة المرور</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </div>
    </div>

    <div className="form-group full-width">
      <label>رقم الهاتف</label>
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
    </div>

    {/* حقول الطالب */}
    {accountType === "student" && (
      <>
        <div className="form-row">
          <div className="form-group">
            <label>التخصص</label>
            <input type="text" value={specialization} onChange={e => setSpecialization(e.target.value)} />
          </div>

          <div className="form-group">
            <label>الجامعة</label>
            <select value={university} onChange={e => setUniversity(e.target.value)}>
              <option>الجامعة الاسلامية</option>
              <option>جامعة فلسطين</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label>سنة التخرج المتوقعة</label>
          <select value={graduationYear} onChange={e => setGraduationYear(e.target.value)}>
            <option>2026</option>
            <option>2027</option>
          </select>
        </div>
      </>
    )}

    {/* حقول الشركة */}
    {accountType === "company" && (
      <>
        <div className="form-group full-width">
          <label>اسم الشركة</label>
          <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>حجم الشركة</label>
            <select value={companySize} onChange={e => setCompanySize(e.target.value)}>
              <option value="">اختر الحجم</option>
              <option>صغيرة</option>
              <option>متوسطة</option>
              <option>كبيرة</option>
            </select>
          </div>

          <div className="form-group">
            <label>القطاع</label>
            <select value={companySector} onChange={e => setCompanySector(e.target.value)}>
              <option value="">اختر القطاع</option>
              <option>تكنولوجيا</option>
              <option>خدمات</option>
              <option>تصنيع</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label>موقع الشركة (اختياري)</label>
          <input type="text" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} />
        </div>
      </>
    )}

    <div className="form-check">
      <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> أوافق على الشروط والأحكام
    </div>

    <button type="submit" className="submit-btn">إنشاء الحساب</button>

    <div className="signup-text">
      <span>لديك حساب بالفعل؟ </span>
      <button type="button" className="signup-link" onClick={() => navigate("/login")}>
        تسجيل الدخول
      </button>
    </div>

  </form>
</div>
  );
}


