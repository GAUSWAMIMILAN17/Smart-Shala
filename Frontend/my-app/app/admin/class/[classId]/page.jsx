"use client";
import { useEffect, useState } from "react";

export default function ClassViewPage() {
  const [classData, setClassData] = useState(null);

  // 🔹 sample data
  useEffect(() => {
    setClassData({
      _id: "class123",
      name: "Class 10-A",
      students: [
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
      ],
      subjects: [
        {
          _id: "sub1",
          name: "Mathematics",
        },
        {
          _id: "sub2",
          name: "Science",
        },
      ],
    });
  }, []);

  // 🔴 delete student (frontend only)
  const deleteStudent = (studentId) => {
    const updatedStudents = classData.students.filter(
      (stu) => stu._id !== studentId
    );

    setClassData({
      ...classData,
      students: updatedStudents,
    });
  };

  // 🔴 delete subject (frontend only)
  const deleteSubject = (subjectId) => {
    const updatedSubjects = classData.subjects.filter(
      (sub) => sub._id !== subjectId
    );

    setClassData({
      ...classData,
      subjects: updatedSubjects,
    });
  };

  if (!classData) return <p>Loading...</p>;

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
          <tbody>
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
          {classData.subjects.map((sub) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}
