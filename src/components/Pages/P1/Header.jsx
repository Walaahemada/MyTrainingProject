import React, { useContext, useState } from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import supabase from "../../../supabase";
import NotificationBell from "./NotificationBell";
import UserContext from "../../../context/UserContext";

function Header() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="Header">
      <nav className="navbar">

        {/* ===== أيقونة المينيو للموبايل ===== */}
        <i 
          className="ri-menu-line menu-icon"
          onClick={() => setShowMenu(true)}
        ></i>

        {/* ===== اللوجو ===== */}
        <div className="logo-section" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo" />
          <h3>تدريبي</h3>
        </div>

        {/* ===== روابط النافبار ===== */}
        <ul className={`nav-links ${showMenu ? "open" : ""}`}>
  
  <li className="close-icon">
    <i 
      className="ri-close-line"
      onClick={() => setShowMenu(false)}
    ></i>
  </li>

  <li><a onClick={() => navigate("/")}>الرئيسية</a></li>
  <li><a onClick={() => navigate("/OppPage")}>الفرص</a></li>
  <li><a onClick={() => navigate("/CompanyPage")}>الشركات</a></li>
  <li><a onClick={() => navigate("/About")}>من نحن</a></li>
  <li><a onClick={() => navigate("/ContactPage")}>اتصل بنا</a></li>

  {/* أزرار الموبايل داخل القائمة الجانبية */}
  {!user && (
    <div className="mobile-auth">
      <button style={{margin:"0 20px"}}onClick={() => { navigate("/login"); setShowMenu(false); }}>
        تسجيل الدخول
      </button>

      <button style={{margin:" 0 20px"}}
        className="register-btn"
        onClick={() => { navigate("/signup"); setShowMenu(false); }}
      >
        إنشاء حساب
      </button>
    </div>
  )}

</ul>

        

        {/* ===== مستخدم غير مسجل ===== */}
        {!user && (
          <div className="auth-buttons">
            <button onClick={() =>{ navigate("/login");setShowMenu(false); }}>تسجيل الدخول</button>
            <button onClick={() => navigate("/signup")} className="register-btn">إنشاء حساب</button>
          </div>
        )}

        {/* ===== طالب مسجل دخول ===== */}
        {user && role === "student" && (
          <div className="profile-area">

            {/* أيقونة الإشعارات */}
            <span 
              className="notif-icon"
            >
         
              <NotificationBell />

            </span>

            {/* صورة البروفايل */}
            <img
              src={userData?.profile_picture}
            className="profile-img"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* قائمة البروفايل */}
            {showDropdown && (
              <div className="profile-dropdown">

                <div className="drop-item" onClick={() => { navigate("/profile"); setShowDropdown(false); }}>
                  <i className="ri-user-line"></i>
                  <span>الملف الشخصي</span>
                </div>

                <div className="drop-item" onClick={() => { navigate("/settings"); setShowDropdown(false); }}>
                  <i className="ri-settings-3-line"></i>
                  <span>الإعدادات</span>
                </div>

                <div className="drop-item logout" onClick={() => { navigate("/login"); setShowDropdown(false); }}>
                  <i className="ri-logout-box-r-line"></i>
                  <span>تسجيل الخروج</span>
                </div>

              </div>
            )}
          </div>
        )}

      </nav>
    </div>
  );
}

export default Header;
