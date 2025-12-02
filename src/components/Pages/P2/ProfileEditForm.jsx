import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const ProfileEditForm = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFullName(data.full_name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const { data:_data, error } = await supabase
      .from("users")
      .update({ full_name: fullName, email, phone })
      .eq("id", (await supabase.auth.getUser()).data.user.id);

    if (error) alert("حدث خطأ أثناء حفظ البيانات: " + error.message);
    else {
      alert("تم تحديث الملف الشخصي بنجاح!");
      onClose();
    }
    setLoading(false);
  };

  console.log("🔥 ProfileEditForm opened!"); // ⬅️ هنا مكانه الصح

  if (loading) return <p>جارٍ تحميل البيانات...</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>تعديل الملف الشخصي</h3>

        <input className="input" placeholder="الاسم الكامل" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="input" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <div className="modal-actions">
          <button className="save" onClick={handleSave}>حفظ</button>
          <button className="cancel" onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;

