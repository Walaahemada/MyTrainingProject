import React, { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import ChangePasswordForm from "./ChangePasswordForm";

const Topbar = ({ title }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-actions">

          <div className="notif">
            <i className="ri-notification-line text-gray-600"></i>
          </div>

          <div
            style={{ background: "#1b9bb7" }}
            className="admin-avatar"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <i className="ri-user-line text-2xl"></i>
          </div>

          {openMenu && (
            <div className="profile-menu">
              <button
                className="menu-item"
                onClick={() => {
                  setShowProfileEdit(true);
                  setOpenMenu(false);
                }}
              >
                تعديل الملف الشخصي
              </button>

              <button
                className="menu-item"
                onClick={() => {
                  setShowChangePass(true);
                  setOpenMenu(false);
                }}
              >
                تغيير كلمة المرور
              </button>

              <button className="menu-item logout" onClick={handleLogout}>
                تسجيل الخروج
              </button>
            </div>
          )}

        </div>

        <div className="topbar-title">{title}</div>
      </header>

      {/* هنا نعرض المودالات */}
      {showProfileEdit && (
        <ProfileEditForm onClose={() => setShowProfileEdit(false)} />
      )}

      {showChangePass && (
        <ChangePasswordForm onClose={() => setShowChangePass(false)} />
      )}
    </>
  );
};

export default Topbar;

