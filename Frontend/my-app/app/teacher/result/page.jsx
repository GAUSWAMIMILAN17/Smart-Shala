"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TEACHER_API_ENDPOINT } from "@/utils/data";
import { setResults } from "@/redux/slices/teacherSlice";

export default function ResultPage() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const { results } = useSelector((store) => store.teacher);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${TEACHER_API_ENDPOINT}/result-publish/${testId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
        
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [testId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Test Results
          </h1>
          <p className="text-gray-500 mt-1">
            Test ID: {testId}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Roll No</th>
                <th className="p-4">Marks Obtained</th>
                <th className="p-4">Total Marks</th>
                <th className="p-4">Percentage</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {results?.map((student) => {
                const percentage =
                  ((student.marks / student.totalMarks) * 100).toFixed(2);

                return (
                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {student.studentName}
                    </td>

                    <td className="p-4 text-gray-600">
                      {student.rollNo}
                    </td>

                    <td className="p-4 text-indigo-600 font-semibold">
                      {student.marks}
                    </td>

                    <td className="p-4">
                      {student.totalMarks}
                    </td>

                    <td className="p-4">
                      {percentage}%
                    </td>

                    <td className="p-4">
                      {percentage >= 33 ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Pass
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          Fail
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {results?.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No Results Found
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
