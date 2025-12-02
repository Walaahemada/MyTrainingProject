import React, { useEffect, useState } from "react";
import supabase from "../../../supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [opportunities, setOpportunities] = useState([]);
  const [chartData, setChartData] = useState([]);

  // جلب بيانات الفرص
  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from("opportunities")
      .select("id, publishdate");

    if (error) {
      console.error("Error fetching opportunities:", error);
      return;
    }

    setOpportunities(data || []);
  };

  useEffect(() => {
    const load = async () => {
      await fetchOpportunities();
    };
    load();
  }, []);
  
  useEffect(() => {
    if (opportunities.length === 0) return;
  
    const generateChartData = () => {
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - i);
        return d.toISOString().split("T")[0];
      }).reverse();
  
      const data = last7Days.map((day) => ({
        date: day,
        count: opportunities.filter(
          (o) => o.publishdate?.split("T")[0] === day
        ).length,
      }));
  
      setChartData(data);
    };
  
    generateChartData();
  }, [opportunities]);
  

    const [stats, setStats] = useState({
      totalUsers: 0,
      totalOpportunities: 0,
      totalApplications: 0,
      pendingCompanies: 0,
    });
  
    const fetchStats = async () => {
      // المستخدمين
      const { data: users } = await supabase.from("users").select("*");
      // الفرص
      const { data: opps } = await supabase.from("opportunities").select("*");
      // الطلبات
      const { data: applications } = await supabase.from("applications").select("*");
      // الفرص المعلقة
      const pending = opps?.filter(o => o.status === "في الانتظار").length || 0;
  
      setStats({
        totalUsers: users?.length || 0,
        totalOpportunities: opps?.length || 0,
        totalApplications: applications?.length || 0,
        pendingCompanies: pending,
      });
    };
  
    useEffect(() => {
      const load = async () => {
        await fetchStats();
      };
      load();
    }, []);
    
    const [weeklyStats, setWeeklyStats] = useState({
      newApplications: 0,
      newOpportunities: 0,
      newRequests: 0,
    });
    
    const fetchWeeklyStats = async () => {
      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
    
      const { data: applications } = await supabase
        .from("applications")
        .select("*")
        .gte("created_at", weekAgo.toISOString());
    
      const { data: opportunities } = await supabase
        .from("opportunities")
        .select("*")
        .gte("publishdate", weekAgo.toISOString());
    
      const { data: requests } = await supabase
        .from("requests")
        .select("*")
        .gte("created_at", weekAgo.toISOString());
    
      setWeeklyStats({
        newApplications: applications?.length || 0,
        newOpportunities: opportunities?.length || 0,
        newRequests: requests?.length || 0,
      });
    };
    
    useEffect(() => {
      const load = async () => {
        await fetchWeeklyStats();
      };
      load();
    }, []);
    
    

  return (
    <div className="reports-container">
      
      {/* الرسم البياني */}
      <div className="activity-rate card-shadow">
        <h3 className="section-title">معدل النشاط - الفرص آخر 7 أيام</h3>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1b9bb7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* إحصائيات شاملة */}
      <div className="stats-container card-shadow">
      <h3 className="section-title">إحصائيات شاملة</h3>
      <div className="stats-list">
        <div className="stats-item blu">إجمالي المستخدمين المسجلين <span>{stats.totalUsers}</span></div>
        <div className="stats-item green">الفرص المنشورة <span>{stats.totalOpportunities}</span></div>
        <div className="stats-item purple">إجمالي الطلبات المقدمة <span>{stats.totalApplications}</span></div>
        <div className="stats-item yellow">الفرص المعلقة   <span>{stats.pendingCompanies}</span></div>
      </div>
    </div>

      {/* النشاط الأسبوعي */}
      <div className="weekly-report card-shadow">
        <h3 className="section-title">تقرير النشاط الأسبوعي</h3>
        <div className="weekly-boxes">
        <div className="week-box light-purple">
          <h4>{weeklyStats.newApplications}</h4>
          <p>طلبات جديدة هذا الأسبوع</p>
        </div>
        <div className="week-box light-green">
          <h4>{weeklyStats.newOpportunities}</h4>
          <p>فرص جديدة هذا الأسبوع</p>
        </div>
        <div className="week-box light-blue">
           <h4>{weeklyStats.newRequests}</h4>
           <p>طلبات جديدة هذا الأسبوع</p>
        </div>

        </div>
      </div>

    </div>
  );
};

export default Reports;
