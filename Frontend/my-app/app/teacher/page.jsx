"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {TEACHER_API_ENDPOINT} from "../../utils/data.js"
import {useDispatch, useSelector} from "react-redux"
import {setDashboard} from "../../redux/slices/teacherSlice.js"

export default function TeacherDashboard() {
  const dispatch = useDispatch();

    const {user} = useSelector((store) => store.auth )
    const {dashboard} = useSelector((store) => store.teacher )

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`${TEACHER_API_ENDPOINT}/dashboard` , {
                withCredentials: true
            })

            if(res.data.success){
                console.log(res.data)
                dispatch(setDashboard(res.data.senitizeSubject))
            }
        } catch (error) {
            console.log(error)
        }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Teacher Dashboard
        </h1>

        {/* Teacher Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">👤 Teacher Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">Role</p>
              <p className="font-medium">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Subject Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📚 Subject Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">Subject Name</p>
              <p className="font-medium">{dashboard?.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">Classroom</p>
              <p className="font-medium">{dashboard?.classroom}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
