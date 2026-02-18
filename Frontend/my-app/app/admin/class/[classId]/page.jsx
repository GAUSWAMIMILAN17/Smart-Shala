"use client";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../../utils/data.js";

export default function ClassViewPage() {
  
  const [students, setStudents] = useState([]);

  const {classId} = useParams()
  const {dashboardData} = useSelector((state) => state.admin);
  const classData = dashboardData?.classList?.find((cls) => cls._id === classId)
  const router = useRouter();

  console.log("Class Data:", classData);

  if (!classData) return <p>Loading...</p>;

  useEffect(() => {
    const fetchStudents = async () => {
      try {

        const res = await axios(`${USER_API_ENDPOINT}/admin/class/${classId}/students`, {
        withCredentials: true,
        })
        if (res.data.success) {
          setStudents(res.data.students);
          console.log("Students in class:", res.data.students);
        }

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchStudents();
  }, [classId]);

  const deleteStudent = async (studentId) => {
    try {
      const res = await axios.delete(`${USER_API_ENDPOINT}/admin/deleteStudent/${studentId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setStudents((prev) => prev.filter((stu) => stu._id !== studentId));
        alert("Student deleted successfully");
        router.push(`/admin/class`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Class: {classData.name}
      </h1>

      {/* STUDENTS */}
      <div className="bg-white px-5 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Students</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu._id} className="border-b">
                <td>{stu?.userId?.name}</td>
                <td>{stu?.userId?.email}</td>
                <td>
                  <button
                    onClick={() => deleteStudent(stu.userId?._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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
