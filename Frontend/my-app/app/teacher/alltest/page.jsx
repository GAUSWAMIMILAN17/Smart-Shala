"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { TEACHER_API_ENDPOINT } from "../../../utils/data";
import { setTests } from "../../../redux/slices/teacherSlice";

export default function TestsPage() {
  const router = useRouter();

  const {tests} = useSelector((store) => store.teacher)

  // ➕ Add Test
  const handleAddTest = () => {
    router.push("/teacher/alltest/create");
  };

  // 👁 View Test
  const handleView = (id) => {
    router.push(`/teacher/alltest/${id}`);
  };
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`${TEACHER_API_ENDPOINT}/getAllTest`, {
          withCredentials :true
        })

        if(res.data.success){
          // console.log(res.data)
          dispatch(setTests(res.data.getAllTest))

        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">All Tests</h1>

          <button
            onClick={handleAddTest}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Add Test
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Classroom</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tests.map((test) => (
                <tr
                  key={test._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {test.title}
                  </td>

                  <td className="p-4 text-gray-600">{test.subject}</td>

                  <td className="p-4 text-gray-600">{test.classroom}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
                        ${
                          test.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : test.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {test.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      {/* View Button */}
                      <button
                        onClick={() => handleView(test._id)}
                        className="py-1 px-5 text-sm bg-blue-600 text-white "
                      >
                        Create
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(test._id)}
                        className=" py-1 px-5 text-sm text-white bg-blue-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {tests.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No Tests Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
