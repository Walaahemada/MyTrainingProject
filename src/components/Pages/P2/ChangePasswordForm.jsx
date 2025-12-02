import React, { useState } from "react";
import supabase from "../../../supabase";

const ChangePasswordForm = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    setMessage("");
    
    // تحقق من تطابق كلمة المرور الجديدة
    if (newPassword !== confirmPassword) {
      setMessage("❌ كلمات المرور الجديدة غير متطابقة");
      return;
    }

    setLoading(true);

    // 1️⃣ جلب المستخدم الحالي
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("❌ لم يتم العثور على المستخدم!");
      setLoading(false);
      return;
    }

    // 2️⃣ التحقق من كلمة المرور الحالية
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      setMessage("❌ كلمة المرور الحالية غير صحيحة");
      setLoading(false);
      return;
    }

    // 3️⃣ تحديث كلمة المرور الجديدة
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setMessage("❌ حدث خطأ أثناء التحديث");
      setLoading(false);
      return;
    }

    setMessage("✅ تم تغيير كلمة المرور بنجاح 🎉");
    setLoading(false);

    // إغلاق النموذج بعد ثانية
    setTimeout(() => onClose(), 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>تغيير كلمة المرور</h3>

        <input
          className="input"
          placeholder="كلمة المرور الحالية"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          className="input"
          placeholder="كلمة المرور الجديدة"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className="input"
          placeholder="تأكيد كلمة المرور الجديدة"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {message && (
          <p style={{ marginTop: "10px", color: message.includes("❌") ? "red" : "green" }}>
            {message}
          </p>
        )}

        <div className="modal-actions">
          <button className="save" onClick={handleChangePassword} disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ"}
          </button>
          <button className="cancel" onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

