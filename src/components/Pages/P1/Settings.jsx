import React, { useContext, useState } from "react";
import "./profile.css";
import UserContext from "../../../context/UserContext";
import supabase from "../../../supabase";

export default function Settings() {
  const { userData } = useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("يرجى تعبئة جميع الحقول");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("كلمة المرور الجديدة غير متطابقة");
      setLoading(false);
      return;
    }

    // 1️⃣ إعادة تسجيل الدخول للتحقق من كلمة المرور القديمة
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: currentPassword,
    });

    if (signInError) {
      alert("❌ كلمة المرور الحالية غير صحيحة");
      setLoading(false);
      return;
    }

    // 2️⃣ تحديث كلمة المرور الجديدة
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (updateError) {
      alert("❌ حدث خطأ أثناء تحديث كلمة المرور");
    } else {
      alert("✔️ تم تغيير كلمة المرور بنجاح!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1 style={{ textAlign: "right", paddingRight: "20px", fontSize: "25px" }}>
        تغيير كلمة المرور
      </h1>

      <div className="profile-container">
        <form className="profile-form" onSubmit={handlePasswordChange}>
          
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>كلمة المرور الحالية</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور الحالية"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>أعد كتابة كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="أعد كتابة كلمة المرور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "جاري التحديث..." : "تغيير كلمة المرور"}
          </button>
        </form>

        <div className="profile-card">
          <img
            src={userData?.profile_picture}
            className="profile-imgg"
          />
          <h2 className="profile-name">{userData.full_name}</h2>
          <p className="profile-role">{userData.major}</p>
        </div>
      </div>
    </div>
  );
}
