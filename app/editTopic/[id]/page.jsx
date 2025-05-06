"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import EditTopicForm from "../../../components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`/api/topics/${id}`, {
      method: "GET", 
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

const  EditTopic = ()  => { 
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null); 
  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getTopicById(id);
  console.log('data',data);
  
        if (!data) {
          setError("Failed to load topic data");
          return; 
        }
        setTopic(data); 
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; 
  }

  if (!topic) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <EditTopicForm
      topic={topic} 
      id={id}
    />
  );
}
export default  EditTopic;