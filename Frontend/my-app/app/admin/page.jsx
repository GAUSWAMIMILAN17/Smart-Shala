"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../../utils/data";
import axios from "axios";
import { setDashboardData } from "../../redux/slices/adminSlice";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchDashboardData = async (e) => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/admin/dashboard`, {
          withCredentials: true,
        });
        // console.log(res.data);

        if (res.data.success) {
          dispatch(setDashboardData(res.data.dashboardData));
          // console.log(dashboardData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Classes" value={dashboardData.totalClasses} />
        <StatCard title="Total Teachers" value={dashboardData.totalTeachers} />
        <StatCard title="Total Students" value={dashboardData.totalStudents} />
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <Card title="Classes">
          
          {dashboardData.classList.slice(0,5).map((cls) => (
            <p key={cls._id} className="text-sm text-gray-700">
              {cls.name}
            </p>
          ))}
          <Link href="/admin/class" className="text-sm text-indigo-600 hover:underline mt-2 block">
            View More
          </Link>
        </Card>

        {/* Teachers */}
        <Card title="Teachers">
          {dashboardData.teacherList.slice(0,5).map((teacher) => (
            <div key={teacher._id} className="text-sm text-gray-700">
              <p className="font-medium">{teacher.name}</p>
              <p className="text-gray-500">{teacher.email}</p>
            </div>
          ))}
          <Link href="/admin/teacher" className="text-sm text-indigo-600 hover:underline mt-2 block">
            View More
          </Link>
        </Card>

        {/* Students */}
        <Card title="Students">
          {dashboardData.studentList.slice(0,5).map((student) => (
            <div key={student._id} className="text-sm text-gray-700">
              <p className="font-medium">{student.name}</p>
              <p className="text-gray-500">{student.email}</p>
            </div>
          ))}
          <Link href="/admin/student" className="text-sm text-indigo-600 hover:underline mt-2 block">
            View More
          </Link>
        </Card>
      </div>
    </div>
  );
}

/* Reusable Components */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-indigo-600">{value}</h2>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}
