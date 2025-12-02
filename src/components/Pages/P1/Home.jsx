import officeBg from "./office-bg.jpg";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${officeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      <div style={{ padding:"50px 0px" }}>
        <div className="hero">
          <div className="hero-content">
            <h1 className="h10">
              ابني <span className="highlight">مستقبلك المهني</span> <br />
              مع <span className="highlight-blue">أفضل الشركات</span>
            </h1>

            <p className="description">
              منصة تدريبي تربط طلبة الجامعات في غزة بأفضل الشركات المحلية والعالمية
              لتوفير فرص تدريب حقيقية تساعدك على تطوير مهاراتك وبناء شبكة علاقات مهنية قوية.
            </p>

            <div className="buttons">
              <button className="companies-btn" onClick={() => navigate("/CompanyPage")}>
                الشركات <i className="ri-building-line"></i>
              </button>
              <button className="explore-btn" onClick={() => navigate("/OppPage")}>
                استكشف الفرص <i className="ri-search-line"></i>
              </button>
            </div>

            <div className="stats">
              <div><span className="number">+500</span> <p>طالب مسجل</p></div>
              <div><span className="number">+150</span> <p>شركة شريكة</p></div>
              <div><span className="number">+300</span> <p>فرصة تدريب</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
