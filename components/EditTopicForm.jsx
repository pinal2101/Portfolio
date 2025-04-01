import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, topic }) {
  const router = useRouter();

  // ✅ Ensure data is initialized correctly
  const [formData, setFormData] = useState({
    projectname: topic?.topic?.projectname || "",
    websitelink: topic?.topic?.websitelink || "",
    technology: topic?.topic?.technology || "",
    description: topic?.topic?.description || "",
    pagebuilder: topic?.topic?.pagebuilder || "",
    clientname: topic?.topic?.clientname || "",
    clientinvoices: topic?.topic?.clientinvoices || [], // Initialize as an array
    bidplatform: topic?.topic?.bidplatform || "",
    bidplatformURL: topic?.topic?.bidplatformURL || "",
    invoiceamount: topic?.topic?.invoiceamount || "",
    projectstartdate: topic?.topic?.projectstartdate
      ? new Date(topic.topic.projectstartdate).toISOString().split("T")[0]
      : "",
    completiondate: topic?.topic?.completiondate
      ? new Date(topic.topic.completiondate).toISOString().split("T")[0]
      : "",
    testimonials: topic?.topic?.testimonials || "",
  });

  // ✅ Ensure state updates when topic changes
  useEffect(() => {
    setFormData({
      projectname: topic?.topic?.projectname || "",
      websitelink: topic?.topic?.websitelink || "",
      technology: topic?.topic?.technology || "",
      description: topic?.topic?.description || "",
      pagebuilder: topic?.topic?.pagebuilder || "",
      clientname: topic?.topic?.clientname || "",
      clientinvoices: topic?.topic?.clientinvoices || [],
      bidplatform: topic?.topic?.bidplatform || "",
      bidplatformURL: topic?.topic?.bidplatformURL || "",
      invoiceamount: topic?.topic?.invoiceamount || "",
      projectstartdate: topic?.topic?.projectstartdate
        ? new Date(topic.topic.projectstartdate).toISOString().split("T")[0]
        : "",
      completiondate: topic?.topic?.completiondate
        ? new Date(topic.topic.completiondate).toISOString().split("T")[0]
        : "",
      testimonials: topic?.topic?.testimonials || "",
    });
  }, [topic]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure that clientinvoices is handled as an array of strings
    if (name === "clientinvoices") {
      // Split clientinvoices value into an array if it's a string
      const invoicePaths = value.split(',').map((path) => path.trim()); // Split and clean up file paths

      setFormData({
        ...formData,
        [name]: invoicePaths, // Store clientinvoices as an array of file paths
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log("Updated Form Data:", { ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure clientinvoices is an array of strings when submitting
    const updatedFormData = {
      ...formData,
      clientinvoices: formData.clientinvoices, // Already an array of file paths
    };

    console.log("Form Data being sent:", updatedFormData);

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      const data = await res.json();
      console.log("API Response:", data);

      // Redirect after successful update
      router.push("/"); 
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="projectname"
            value={formData.projectname}
            onChange={handleChange}
            placeholder="Project Name"
            className="input-field"
          />
          <input
            name="websitelink"
            value={formData.websitelink}
            onChange={handleChange}
            placeholder="Website Link"
            className="input-field"
          />
        </div>

        <input
          name="technology"
          value={formData.technology}
          onChange={handleChange}
          placeholder="Technology"
          className="input-field"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input-field"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="pagebuilder"
            value={formData.pagebuilder}
            onChange={handleChange}
            placeholder="Page Builder"
            className="input-field"
          />
          <input
            name="clientname"
            value={formData.clientname}
            onChange={handleChange}
            placeholder="Client Name"
            className="input-field"
          />
        </div>

        <textarea
          name="clientinvoices"
          value={formData.clientinvoices.join(",")} // Join array as a comma-separated string for input field
          onChange={handleChange}
          placeholder="Client Invoices (comma-separated file paths)"
          className="input-field"
        />
        <input
          name="bidplatform"
          value={formData.bidplatform}
          onChange={handleChange}
          placeholder="Bid Platform"
          className="input-field"
        />
        <input
          name="bidplatformURL"
          value={formData.bidplatformURL}
          onChange={handleChange}
          placeholder="Bid Platform URL"
          className="input-field"
        />

        <input
          name="invoiceamount"
          type="number"
          value={formData.invoiceamount}
          onChange={handleChange}
          placeholder="Invoice Amount"
          className="input-field"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="projectstartdate"
            type="date"
            value={formData.projectstartdate}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="completiondate"
            type="date"
            value={formData.completiondate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <textarea
          name="testimonials"
          value={formData.testimonials}
          onChange={handleChange}
          placeholder="Testimonials"
          className="input-field"
        />

        <button type="submit" className="btn-primary">
          Update Topic
        </button>
      </form>
    </div>
  );
}
