"use client";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function ClassViewPage() {
  

  const {classId} = useParams()
  const {dashboardData} = useSelector((state) => state.admin);
  const classData = dashboardData?.classList?.find((cls) => cls._id === classId)

  console.log("Class Data:", classData);

  if (!classData) return <p>Loading...</p>;

  useEffect(() => {
    const fetchStudents = async () => {
      try {

        const res = await axios(`${USER_API_ENDPOINT}/admin/class/${classId}/students`, {
        withCredentials: true,
        })
        if (res.data.success) {
          console.log("Students in class:", res.data.students);
        }

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchStudents();
  });


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Class: {classData.name}
      </h1>

      {/* STUDENTS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Students</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          {/* <tbody>
            {classData.students.map((stu) => (
              <tr key={stu._id} className="border-b">
                <td>{stu.name}</td>
                <td>{stu.email}</td>
                <td>
                  <button
                    onClick={() => deleteStudent(stu._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>

      {/* SUBJECTS */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subjects</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            + Add Subject
          </button>
        </div>

        <ul>
          {/* {classData.subjects.map((sub) => (
            <li
              key={sub._id}
              className="flex justify-between border-b py-2"
            >
              {sub.name}
              <button
                onClick={() => deleteSubject(sub._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
