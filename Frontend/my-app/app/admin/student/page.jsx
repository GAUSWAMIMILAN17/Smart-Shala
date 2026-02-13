"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data";

export default function StudentPage() {
  const { dashboardData } = useSelector((state) => state.admin);
  const students = dashboardData.studentList;
  const router = useRouter();

  const deleteStudent = async (id) => {
    console.log("Delete student with ID:", id);
    try {
      const res = await axios.delete(
        `${USER_API_ENDPOINT}/admin/deleteStudent/${id}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        alert(res.data.message);
        router.push("/admin/");
      }
    } catch (error) {
      console.log("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  const fileInputRef = useRef(null);

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
        `${USER_API_ENDPOINT}/admin/bulk-register-student`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("Response from server:", res.data);
      if (res.data.success) {
        alert(
          `${res.data.message}. Registered ${res.data.successCount} students. Failed to register ${res.data.failedCount} students.`,
        );
        // console.log(
        //   `${res.data.message}. Registered ${res.data.successCount} students. Failed to register ${res.data.failedCount} students.`,
        // );
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
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href="/admin/student/add">
            <button className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              + Add Student
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
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              accept=".xlsx,.xls"
              hidden
            />
          </div>
        </div>
      </div>

      {/* Student Table */}
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
                Action
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr
                key={stu._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {stu.name}
                </td>

                <td className="px-6 py-4 text-gray-600">{stu.email}</td>

                <td className="px-6 py-4">
                  <button className="text-sm text-indigo-600 hover:underline">
                    View
                  </button>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteStudent(stu._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
