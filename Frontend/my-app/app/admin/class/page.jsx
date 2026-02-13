"use client";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setDashboardData } from "../../../redux/slices/adminSlice.js";


export default function ClassPage() {
  const { dashboardData } = useSelector((state) => state.admin);
  const router = useRouter();
  const dispatch = useDispatch();

  const classes = dashboardData?.classList;

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${USER_API_ENDPOINT}/admin/classroom/${id}`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);

      if (res.data.success) {
        alert("Class deleted successfully");
        router.push("/admin/");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Classes</h1>

        <Link href="/admin/class/add" className="mt-4 sm:mt-0">
          <button className="px-4 py-2 mt-4 sm:mt-0 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            + Add Class
          </button>
        </Link>
      </div>

      {/* Class List */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Class Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                ClassId
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
            {classes?.map((cls) => (
              <tr
                key={cls._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {cls.name}
                </td>

                <td className="px-6 py-4 text-gray-600">{cls._id}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/class/${cls._id}`} className="text-sm text-indigo-600 hover:underline">
                    <button className="text-sm text-indigo-600 hover:underline">
                      View
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <button
                    onClick={() => deleteHandler(cls._id)}
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
