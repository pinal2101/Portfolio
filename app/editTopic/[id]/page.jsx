"use client"; // Declare as a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for routing
import { useParams } from "next/navigation"; // Correct import for accessing route params
import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
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
  const router = useRouter();
  const params = useParams(); // ✅ Use useParams() instead of destructuring props
  const id = params?.id; // Extract the id safely

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getTopicById(id);
        if (!data) {
          router.push("/error"); // Redirect to an error page if data fetching fails
        } else {
          setTopic(data); // Ensure default values
        }
      }
    };

    fetchData();
  }, [id, router]);

  if (!topic) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <EditTopicForm
      id={id} // ✅ Pass ID to the form
      projectname={topic.projectname || ""}
      websitelink={topic.websitelink || ""}
      technology={topic.technology || ""}
      description={topic.description || ""}
      pagebuilder={topic.pagebuilder || ""}
      clientname={topic.clientname || ""}
      clientinvoices={topic.clientinvoices || ""}
      bidplatform={topic.bidplatform || ""}
      bidplatformURL={topic.bidplatformURL || ""}
      invoiceamount={topic.invoiceamount || ""}
      projectstartdate={topic.projectstartdate || ""}
      completiondate={topic.completiondate || ""}
      testimonials={topic.testimonials || ""}
    />
  );
}


