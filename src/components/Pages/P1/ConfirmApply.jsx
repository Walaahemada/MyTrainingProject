import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../../supabase";

export default function ConfirmApply() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p>لا توجد بيانات لإكمال العملية.</p>;
  }

  const { fullName, email, cvFile, message, studentId, opportunityId } = state;

  const confirmSend = async () => {

    // رفع CV
    let cvUrl = null;
    if (cvFile) {
      const fileName = `${studentId}-${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("cv-uploads")
        .upload(fileName, cvFile);

      if (uploadError) {
        alert("خطأ في رفع السيرة الذاتية");
        return;
      }

      cvUrl = supabase.storage
        .from("cv-uploads")
        .getPublicUrl(fileName).data.publicUrl;
    }

    // إدخال الطلب
    const { error } = await supabase.from("proposals").insert({
      student_id: studentId,
      opportunity_id: opportunityId,
      status: "pending",
      full_name: fullName,
      email,
      cv_url: cvUrl,
      message,
    });

    if (error) {
      alert("فشل إرسال الطلب: " + error.message);
      return;
    }

    navigate("/success-apply");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">تأكيد التقديم</h2>
        <p className="text-gray-600 mb-6">
          هل أنت متأكد من إرسال طلب التقديم لهذه الفرصة؟
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 rounded-lg"
          >
            رجوع
          </button>

          <button
            onClick={confirmSend}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            نعم، إرسال
          </button>
        </div>
      </div>
    </div>
  );
}
