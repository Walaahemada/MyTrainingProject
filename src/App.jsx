import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "remixicon/fonts/remixicon.css";
// import logo from './logo.svg';
import './App.css';
import Footer from './components/Pages/P1/Footer';
import Main from './components/Pages/P1/Main';
import Header from './components/Pages/P1/Header';
import Login from './components/Pages/P1/Login';
import Signup from './components/Pages/P1/Signup';
import ForgetPass from './components/Pages/P1/ForgetPass';
import ResetPass from './components/Pages/P1/ResetPass';
import Topbar from './components/Pages/P2/Topbar';
import Layout from './components/Pages/P2/Layout';
import Layout1 from "./components/Pages/P3/Layout1";
import Layout2 from "./components/Pages/P2/Layout2";
import OppPage from "./components/Pages/P1/OppPage";
import CompanyPage from "./components/Pages/P1/CompanyPage";
import About from "./components/Pages/P1/About";
import ContactPage from "./components/Pages/P1/ContactPage";
import ApplicationPage from "./components/Pages/P1/ApplicationPage";
import CompanyOpportunities from "./components/Pages/P1/CompanyOpportunities";
import Profile from "./components/Pages/P1/Profile";
import Settings from "./components/Pages/P1/Settings";
// import ProfileEdit from "./components/Pages/P2/ProfileEdit";
import UserProvider from "./context/UserProvider";


function App() {
  return (
    <Router>
      <PageLayout />
    
    </Router>
   
  );
}

function PageLayout() {
  const location = useLocation();

  const hideLayout = [
    "/login", "/signup","/forget-password", "/reset-password",
    "/CompanyOpportunities",
    "/admin" ,  "/layout", 
    "/layout1", "/layout2","/profile-edit"
  ].includes(location.pathname);

  return (
    <div className="App">
      <UserProvider>
      {!hideLayout && <Header />}

      {/* نغلف المحتوى هنا */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/OppPage" element={<OppPage />} />
          <Route path="/CompanyPage" element={<CompanyPage />} />
          <Route path="/CompanyOpportunities" element={<CompanyOpportunities />} />
          <Route path="/About" element={<About />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/apply" element={<ApplicationPage />} />
          <Route path="/admin" element={<Topbar />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/layout1" element={<Layout1 />} />
          <Route path="/layout2" element={<Layout2 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
        </Routes>
      </div>

      {!hideLayout && <Footer />}
      </UserProvider>
    </div>
  );
}


export default App;


