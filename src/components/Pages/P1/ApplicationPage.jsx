import React, { useState,useContext } from "react";
import supabase  from "../../../supabase"; // تأكد أن المسار صحيح
import UserContext from "../../../context/UserContext"; 
import { useLocation } from "react-router-dom";

export default function ApplicationPage() {
  
  const { userData } = useContext(UserContext);
  

  const studentId = userData?.id; // 👈 اخذنا id من الكونتكست
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  const location = useLocation();
  const opportunity = location.state;
  console.log("Opportunity from state:", opportunity);

const opportunityId = opportunity?.id;

if (!opportunityId) {
  // منع محاولة الإدخال إذا ما فيه id — اعرض رسالة واضحة للمستخدم
  // هذا يمنع خطأ الـ NOT NULL في DB
  alert("خطأ: لم يتم تمرير بيانات الفرصة. الرجاء فتح نموذج التقديم من زر 'تقدم الآن' داخل بطاقة الفرصة.");
  return null; // أو اعرض رسالة بدلاً من الفورم
}

  const confirmApply = async () => {
    setShowConfirm(false);

    // 1) رفع ملف السيرة الذاتية إلى Supabase Storage
    let cvUrl = null;
    if (cvFile) {
      const fileName = `${studentId}-${Date.now()}.pdf`;

      const { data: uploadData, error: uploadError } = await supabase.storage
      .from("cv-uploads")
      .upload(fileName, cvFile, {
        contentType: cvFile.type,
      });
    
      if (uploadError) {
        alert("فشل رفع السيرة الذاتية"+uploadError.message);
        return;
      }

      cvUrl = supabase.storage.from("cv-uploads").getPublicUrl(fileName).data.publicUrl;
    }

    // 2) إدخال البيانات داخل جدول proposals
    const { error } = await supabase
      .from("proposals")
      .insert([
        {
          student_id: studentId,
          opportunity_id: opportunityId,
          status: "pending", // الافتراضي
          full_name: fullName,
          email,
          cv_url: cvUrl,
          message,
        },
      ]);

    if (error) {
      console.log("Insert error:", error);
      alert("حدث خطأ أثناء إرسال الطلب"+ error.message);
      return;
    }

    alert("تم إرسال طلبك بنجاح!");
  };

  return (
    <div style={{ padding: "100px 60px" }} className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border">

        <h1 className="text-3xl font-bold text-blue-600 mb-3">التقديم على فرصة التدريب</h1>
        <p className="text-gray-500 mb-6">
          يرجى تعبئة البيانات التالية لإرسال طلبك للتدريب.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1 font-medium">اسمك الكامل</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ارفع السيرة الذاتية (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full border rounded-lg px-3 py-2"
              required
              onChange={(e) => setCvFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">رسالة التقديم</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-32 focus:outline-blue-500"
              placeholder="اكتب رسالة قصيرة…"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            إرسال الطلب
          </button>
        </form>
      </div>

      {/* مودال التأكيد */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-bold mb-3">تأكيد التقديم</h2>
            <p className="text-gray-600 mb-6">هل أنت متأكد من إرسال طلب التقديم الآن؟</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg font-medium"
              >
                إلغاء
              </button>

              <button
                onClick={confirmApply}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                نعم، إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

