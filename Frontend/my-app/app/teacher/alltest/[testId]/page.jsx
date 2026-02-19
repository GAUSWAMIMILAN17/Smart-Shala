"use client";

import { useState } from "react";

export default function CreateTestPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  // ➕ Add Question
  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      questionText: "",
      marks: 1,
    };

    setQuestions([...questions, newQuestion]);
  };

  // ❌ Remove Question
  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // ✏️ Update Question
  const handleQuestionChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  // 💾 Save Draft
  const handleDraft = () => {
    const testData = {
      title,
      description,
      questions,
      status: "Draft",
    };

    console.log("Draft Test:", testData);
    alert("Test saved as Draft");
  };

  // 🚀 Publish Test
  const handlePublish = () => {
    const testData = {
      title,
      description,
      questions,
      status: "Published",
    };

    console.log("Published Test:", testData);
    alert("Test Published Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-semibold mb-6">Create New Test</h1>

        {/* Test Details */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Test Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter test title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Questions ({questions.length})
            </h2>

            <button
              onClick={handleAddQuestion}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              + Add Question
            </button>
          </div>

          {questions.length === 0 && (
            <p className="text-gray-500 text-sm">No questions added yet.</p>
          )}

          {questions.map((question, index) => (
            <div
              key={question.id}
              className="border rounded-lg p-4 mb-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Question {index + 1}</h3>

                <button
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>

              <textarea
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(
                    question.id,
                    "questionText",
                    e.target.value,
                  )
                }
                className="w-full border rounded-md px-3 py-2 mb-3"
                placeholder="Enter question text"
              />

              <input
                type="number"
                value={question.marks}
                onChange={(e) =>
                  handleQuestionChange(question.id, "marks", e.target.value)
                }
                className="w-24 border rounded-md px-3 py-2"
                placeholder="Marks"
              />
            </div>
          ))}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-10 pt-6 border-t flex justify-between items-center">
          {/* Total Marks */}
          <div className="text-sm text-gray-600">
            Total Questions:{" "}
            <span className="font-semibold">{questions.length}</span> | Total
            Marks:{" "}
            <span className="font-semibold">
              {questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleDraft}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-800 transition"
            >
              Save as Draft
            </button>

            <button
              onClick={handlePublish}
              disabled={questions.length === 0}
              className={`px-6 py-2 rounded-md text-white bg-blue-600 transition
        ${
          questions.length === 0
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
            >
              Publish Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
