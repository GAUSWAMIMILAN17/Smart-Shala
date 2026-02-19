"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import {TEACHER_API_ENDPOINT} from "../../../utils/data.js"
import {useDispatch, useSelector} from "react-redux"
import {setSubmission} from "../../../redux/slices/teacherSlice.js"

export default function SubmissionsPage() {
  const { testId } = useParams();

  const dispatch = useDispatch();
  const {submissions} = useSelector((store)=>store.teacher)
  useEffect(()=> {
    const fetchData = async() => {
      try {
        const res = await axios.get(`${TEACHER_API_ENDPOINT}/allSubmission`, {
          withCredentials :true
        })

        if(res.data.success){
          // console.log(res.data)
          dispatch(setSubmission(res.data.allTestSubmission))

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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Test Submissions
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
                <th className="p-4">Submitted At</th>
                {/* <th className="p-4">Marks</th> */}
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {submission.student.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {submission.submittedAt}
                  </td>

                  {/* <td className="p-4">
                    <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                      {submission.marks} / {submission.total}
                    </span>
                  </td> */}

                  <td className="p-4 text-center">
                    <button
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                    >
                      View Answers
                    </button>
                  </td>
                </tr>
              ))}

              {submissions.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No submissions yet
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
