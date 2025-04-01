"use client"; // Declare as a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import EditTopicForm from "../../../components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`/api/topics/${id}`, {
      method: "GET", // ✅ Explicitly specify GET
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching topic:", error);
    return null;
  }
};

export default function EditTopic() {
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const router = useRouter();
  const { id } = useParams(); // ✅ Destructure the ID directly

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getTopicById(id);

        if (!data) {
          setError("Failed to load topic data");
          return; // Skip setting state if data is null
        }
        setTopic(data); // ✅ Ensure data is properly set
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Display error message
  }

  if (!topic) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <EditTopicForm
      topic={topic} // Pass the whole topic object
      id={id}
    />
  );
}
