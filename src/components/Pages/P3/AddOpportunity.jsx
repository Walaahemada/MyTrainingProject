import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

function AddOpportunity() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    skills: "",
    status: "في الانتظار",

    company_name: "",
    location: "",
    start_date: "",
    end_date: "",
    image: "",
    price: "",   // ⭐ تمت إضافة السعر
  });

  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        alert("حدث خطأ في جلب بيانات المستخدم");
        return;
      }
      setCompanyId(user.id);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert("لم يتم التعرف على المستخدم الحالي.");
      return;
    }

    // ⭐ إدخال الفرصة + السعر
    const { data: oppData, error: oppError } = await supabase
      .from("opportunities")
      .insert([
        {
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          type: formData.type,
          skills: formData.skills,
          status: formData.status,

          company_id: companyId,
          company_name: formData.company_name,
          location: formData.location,
          start_date: formData.start_date,
          end_date: formData.end_date,
          image: formData.image,
          price: formData.price, // ⭐ السعر هنا
        },
      ])
      .select();

    if (oppError) {
      alert("حدث خطأ أثناء إضافة الفرصة: " + oppError.message);
      return;
    }

    // جلب كل الطلاب
    const { data: students, error: studentsError } = await supabase
      .from("users")
      .select("id")
      .eq("role", "student");

    if (studentsError) {
      alert("حدث خطأ أثناء جلب الطلاب");
      return;
    }

    // الإشعارات
    const notifications = students.map((s) => ({
      user_id: s.id,
      title: "فرصة تدريب جديدة",
      message: `تم نشر فرصة جديدة بعنوان: ${formData.title}`,
      is_read: false,
    }));

    const { error: notifError } = await supabase
      .from("notifications")
      .insert(notifications);

    if (notifError) {
      alert("تمت إضافة الفرصة، لكن حدث خطأ أثناء إرسال الإشعارات");
    } else {
      alert("تم إضافة الفرصة وإرسال الإشعارات بنجاح ✔️");
    }

    // ⭐ تنظيف الفورم وحذف السعر أيضًا
    setFormData({
      title: "",
      description: "",
      duration: "",
      type: "",
      skills: "",
      status: "في الانتظار",

      company_name: "",
      location: "",
      start_date: "",
      end_date: "",
      image: "",
      price: "",
    });
  };

  return (
    <div style={{ marginTop: "15px" }} className="opportunity-form-container">
      <h2 className="form-title">إضافة فرصة جديدة</h2>

      <form className="opportunity-form" onSubmit={handleSubmit}>

        {/* اسم المؤسسة */}
        <div className="form-group">
          <label>اسم المؤسسة</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="أدخل اسم المؤسسة"
            required
          />
        </div>

        {/* عنوان الفرصة */}
        <div className="form-group">
          <label>عنوان الفرصة</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="أدخل عنوان الفرصة"
            required
          />
        </div>

        {/* الوصف */}
        <div className="form-group">
          <label>الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="أدخل وصفاً واضحاً للفرصة"
            rows="4"
            required
          ></textarea>
        </div>

        {/* الموقع */}
        <div className="form-group">
          <label>الموقع</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="مثال: غزة - الرمال"
          />
        </div>

        {/* تاريخ البدء والانتهاء */}
        <div className="form-row">
          <div className="form-group">
            <label>تاريخ البدء</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>تاريخ الانتهاء</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange}/>
          </div>
        </div>

        {/* المدة والنوع */}
        <div className="form-row">
          <div className="form-group">
            <label>المدة</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="مثل: 3 شهور"
            />
          </div>

          <div className="form-group">
            <label>نوع الفرصة</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">اختر النوع</option>
              <option value="حضوري">حضوري</option>
              <option value="عن بعد">عن بعد</option>
              <option value="مختلط">مختلط</option>
            </select>
          </div>
        </div>

        {/* المهارات */}
        <div className="form-group">
          <label>المهارات المطلوبة</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="مثل: JavaScript, React"
          />
        </div>

        {/* ⭐ السعر */}
        <div className="form-group">
          <label>السعر (شيكل)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="مثل: 50"
            min="0"
          />
        </div>

        {/* صورة */}
        <div className="form-group">
          <label>رابط صورة</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="submit-btn">إضافة الفرصة</button>
      </form>
    </div>
  );
}

export default AddOpportunity;
