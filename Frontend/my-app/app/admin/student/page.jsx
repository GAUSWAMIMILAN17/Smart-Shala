"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentPage() {
  const [students, setStudents] = useState([]);

  // 🔹 Sample data load
  useEffect(() => {
    setStudents([
      {
        _id: "stu1",
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
      },
      {
        _id: "stu2",
        name: "Priya Patel",
        email: "priya@gmail.com",
      },
      {
        _id: "stu3",
        name: "Amit Verma",
        email: "amit@gmail.com",
      },
    ]);
  }, []);

  // 🔴 Delete student (frontend only)
  const deleteStudent = (id) => {
    const filtered = students.filter((stu) => stu._id !== id);
    setStudents(filtered);
    alert("Student deleted (sample)");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href="/admin/students/add">
            <button className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              + Add Student
            </button>
          </Link>

          <button className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700">
            Bulk Upload
          </button>
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

                <td className="px-6 py-4 text-gray-600">
                  {stu.email}
                </td>

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
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
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
