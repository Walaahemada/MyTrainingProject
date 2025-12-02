import React, { useEffect, useState,useContext } from "react";
import supabase from "../../../supabase"; // رابط إعداد Supabase
import "./profile.css";
import UserContext from "../../../context/UserContext";


export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);

  

  // تحديث البيانات
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userData) return;
    setLoading(true);

    let profileURL = userData.profile_picture;

    // رفع صورة جديدة إذا تم اختيارها
    if (newImage) {
      const fileName = `${userData.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from("profiles") // Bucket يجب أن يكون موجود Public
        .upload(fileName, newImage);

      if (uploadError) {
        alert("فشل رفع الصورة: " + uploadError.message);
        setLoading(false);
        return;
      }

      // الحصول على رابط الصورة العامة
      const { data: img } = supabase.storage
        .from("profiles")
        .getPublicUrl(fileName);

      profileURL = img.publicUrl;
    }

    // تحديث البيانات في جدول users
    const { error } = await supabase
      .from("users")
      .update({
        full_name: userData.full_name,
        email: userData.email,
        major: userData.major,
        university: userData.university,
        phone: userData.phone,
        graduation_year: userData.graduation_year,
        profile_picture: profileURL,
      })
      .eq("id", userData.id);

    setLoading(false);

    if (!error) {
      alert("تم تحديث البيانات بنجاح!");
      setUserData({ ...userData, profile_picture: profileURL });
      setNewImage(null);
    } else {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1 style={{ textAlign: "right", paddingRight: "20px", fontSize: "25px" }}>
        الملف الشخصي
      </h1>

      <div className="profile-container">
        <form className="profile-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>الاسم</label>
            <input
              type="text"
              value={userData.full_name}
              onChange={(e) =>
                setUserData({ ...userData, full_name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>التخصص</label>
            <input
              type="text"
              value={userData.major || ""}
              onChange={(e) =>
                setUserData({ ...userData, major: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>الجامعة</label>
            <input
              type="text"
              value={userData.university || ""}
              onChange={(e) =>
                setUserData({ ...userData, university: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>رقم الجوال</label>
            <input
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </div>

          <div className="form-group"  style={{ gridColumn: "span 2" }}>
            <label>سنة التخرج</label>
            <input
              type="text"
              value={userData.graduation_year || ""}
              onChange={(e) =>
                setUserData({ ...userData, graduation_year: e.target.value })
              }
            />
          </div>

          {/* رفع صورة جديدة */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>تغيير صورة البروفايل</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "جاري التحديث..." : "تحديث البيانات"}
          </button>
        </form>

        <div className="profile-card">
          <img
            src={
              newImage
                ? URL.createObjectURL(newImage)
                : userData.profile_picture || "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="profile-imgg"
          />
          <h2 className="profile-name">{userData.full_name}</h2>
          <p className="profile-role">{userData.major}</p>
        </div>
      </div>
    </div>
  );
}
