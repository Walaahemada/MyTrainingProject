import React from "react";

const StatusBadge = ({ type }) => {
  let bgColor = "#f3f4f6"; // خلفية افتراضية
  let textColor = "#111827"; // نص افتراضي

  if (type === "موافق عليه") {
    bgColor = "#d1fae5"; // أخضر فاتح
    textColor = "#047857"; // أخضر داكن للنص
  } else if (type === "مرفوض") {
    bgColor = "#fee2e2"; // أحمر فاتح
    textColor = "#b91c1c"; // أحمر للنص
  } else if (type === "في الانتظار") {
    bgColor = "#fef3c7"; // أصفر فاتح
    textColor = "#b45309"; // أصفر داكن
  }

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "4px 10px",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "13px",
        minWidth: "70px",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {type || "في الانتظار"}
    </span>
  );
};

export default StatusBadge;
