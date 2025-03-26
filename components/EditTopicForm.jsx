"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id }) {
  const [project, setProject] = useState({
    projectname: "",
    websitelink: "",
    technology: "",
    description: "",
    pagebuilder: "",
    clientname: "",
    clientinvoices: "",
    bidplatform: "",
    bidplatformURL: "",
    invoiceamount: "",
    projectstartdate: "",
    completiondate: "",
    testimonials: "",
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/topics?id=${id}`); // ✅ Ensure correct API call
        if (!res.ok) throw new Error(`Failed to fetch project. Status: ${res.status}`);
        
        const data = await res.json();
        const fetchedProject = data?.topic || data; // ✅ Ensure correct response format

        // ✅ Convert date fields to YYYY-MM-DD format for input compatibility
        setProject({
          ...fetchedProject,
          projectstartdate: fetchedProject.projectstartdate ? new Date(fetchedProject.projectstartdate).toISOString().split("T")[0] : "",
          completiondate: fetchedProject.completiondate ? new Date(fetchedProject.completiondate).toISOString().split("T")[0] : "",
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setProject((prevProject) => ({
      ...prevProject,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project.projectname || !project.websitelink || !project.technology) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`/api/topics?id=${id}`, { // ✅ Corrected API request
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (!res.ok) throw new Error(`Failed to update project. Status: ${res.status}`);

      router.push("/");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <input name="projectname" value={project.projectname} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Project Name" required />
      <input name="websitelink" value={project.websitelink} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="url" placeholder="Website Link" required />
      <input name="technology" value={project.technology} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Technology" required />
      <textarea name="description" value={project.description} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" placeholder="Project Description"></textarea>
      <input name="pagebuilder" value={project.pagebuilder} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Page Builder" />
      <input name="clientname" value={project.clientname} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Client Name" />
      <input name="clientinvoices" value={project.clientinvoices} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Client Invoices" />
      <input name="bidplatform" value={project.bidplatform} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="text" placeholder="Bid Platform" />
      <input name="bidplatformURL" value={project.bidplatformURL} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="url" placeholder="Bid Platform URL" />
      <input name="invoiceamount" value={project.invoiceamount} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="number" placeholder="Invoice Amount" />
      <input name="projectstartdate" value={project.projectstartdate} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="date" />
      <input name="completiondate" value={project.completiondate} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" type="date" />
      <textarea name="testimonials" value={project.testimonials} onChange={handleChange} className="border px-4 py-2 rounded-lg w-full mb-3" placeholder="Testimonials"></textarea>

      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">Update Project</button>
    </form>
  );
}


