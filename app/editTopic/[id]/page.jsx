
// "use client"; // Declare as a Client Component

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import EditTopicForm from "../../../components/EditTopicForm";

// const getTopicById = async (id) => {
//   try {
//     const res = await fetch(`/api/topics/${id}`, {
//       method: "GET", // ✅ Explicitly specify GET
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topic");
//     }

//     return res.json();
//   } catch (error) {
//     console.error("Error fetching topic:", error);
//     return null;
//   }
// };

// export default function EditTopic() {
//   const [topic, setTopic] = useState(null);
//   const router = useRouter();
//   const { id } = useParams(); // ✅ Destructure the ID directly

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         const data = await getTopicById(id);
    
//         console.log('2131231',data)
//         if (!data) {
//           router.push("/error"); // Redirect to error page if fetching fails
//         } else {
//           setTopic(data); // ✅ Ensure data is properly set
//         }
//       }
//     };

//     fetchData();
//   }, [id, router]);

//   if (!topic) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   return (
//     <EditTopicForm
//       id={id} // ✅ Pass ID to form
//       projectname={topic.projectname || ""}
//       websitelink={topic.websitelink || ""}
//       technology={topic.technology || ""}
//       description={topic.description || ""}
//       pagebuilder={topic.pagebuilder || ""}
//       clientname={topic.clientname || ""}
//       clientinvoices={topic.clientinvoices || ""}
//       bidplatform={topic.bidplatform || ""}
//       bidplatformURL={topic.bidplatformURL || ""}
//       invoiceamount={topic.invoiceamount || ""}
//       projectstartdate={topic.projectstartdate || ""}
//       completiondate={topic.completiondate || ""}
//       testimonials={topic.testimonials || ""}
//       topic={topic}
//     />
//   );
// }


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
