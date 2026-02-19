"use client";

import { useState } from "react";
import axios from "axios";
import { TEACHER_API_ENDPOINT } from "../../../../utils/data.js";
import { useRouter } from "next/navigation";

export default function CreateTestPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classroom: "",
    duration: "",
    totalMarks: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${TEACHER_API_ENDPOINT}/create-test`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data)
        alert("Test Created Successfully ✅");
        router.push("/teacher/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create New Test
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Test Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm mb-1">Subject ID</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Classroom */}
          <div>
            <label className="block text-sm mb-1">Classroom ID</label>
            <input
              type="text"
              name="classroom"
              value={formData.classroom}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm mb-1">Duration (Minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="block text-sm mb-1">Total Marks</label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Creating..." : "Create Test"}
          </button>
        </form>
      </div>
    </div>
  );
}
