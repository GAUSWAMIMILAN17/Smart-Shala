"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data";
import { useRouter } from "next/navigation";
import React from "react";

export default function TeacherPage() {
  const { dashboardData } = useSelector((state) => state.admin);
  // console.log(dashboardData.teacherList);
  const teachers = dashboardData.teacherList;
  const router = useRouter();

  const deleteHandler = async (teacherId) => {
    const res = await axios.delete(
      `${USER_API_ENDPOINT}/admin/deleteTeacher/${teacherId}`,
      {
        withCredentials: true,
      },
    );
    if (res.data.success) {
      alert(res.data.message);
      router.push("/admin/");
    }
  };

  //bulk data submit

  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/admin/bulk-register-teacher`,
        formData,
        {
        // {   headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true },
      );
      console.log("Response from server:", res.data);
      if (res.data.success) {
        alert(`${res.data.message}. Registered ${res.data.successCount} teachers. Failed to register ${res.data.failedCount} teachers.`);
        console.log(`${res.data.message}. Registered ${res.data.successCount} teachers. Failed to register ${res.data.failedCount} teachers.`)
        router.push("/admin/");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href="/admin/teacher/add">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              + Add Teacher
            </button>
          </Link>

          <div>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Upload Excel / Bulk Data (Xcel Sheets Only)
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              hidden
            />
          </div>
        </div>
      </div>

      {/* Teacher Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Subject
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Action
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{teacher.email}</td>
                <td className="px-6 py-4 text-gray-600">{teacher.subject}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-indigo-600 hover:underline">
                    View
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteHandler(teacher._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
