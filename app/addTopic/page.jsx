"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function AddTopicPage() {
  const [formData, setFormData] = useState({
    projectname: "",
    websitelink: "",
    technology: "React",
    description: "",
    pagebuilder: "A",
    clientname: "",
    bidplatform: "",
    bidplatformURL: "",
    invoiceamount: "",
    projectstartdate: "",
    completiondate: "",
    testimonials: "",
  });

  const [clientInvoices, setClientInvoices] = useState([]); // Store selected files

  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setClientInvoices(files);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send files
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append files to FormData
    clientInvoices.forEach((file) => {
      data.append("clientinvoices", file);
    });

    try {
      const response = await fetch(`/api/topics`, {
        method: "POST",
        body: data, // Send as FormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      alert("Topic added successfully!");
      router.push("/"); // ✅ Redirect to home page

    } catch (error) {
      console.error("Submit Error:", error);
      alert("Error adding topic.");
    }
  };

  return (
    <div className="container">
      <h1>Add a New Topic</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="projectname" value={formData.projectname} onChange={handleChange} placeholder="Project Name" required />
        <input type="text" name="websitelink" value={formData.websitelink} onChange={handleChange} placeholder="Website Link" required />

        <select name="technology" value={formData.technology} onChange={handleChange} required>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="Angular">Angular</option>
          <option value="Next.js">Next.js</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />

        <select name="pagebuilder" value={formData.pagebuilder} onChange={handleChange} required>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <input type="text" name="clientname" value={formData.clientname} onChange={handleChange} placeholder="Client Name" required />
        
        {/* File Upload Input */}
        <input type="file" multiple onChange={handleFileChange} required />

        {/* Display selected files */}
        {clientInvoices.length > 0 && (
          <div className="file-preview">
            <h4>Selected Files:</h4>
            <ul>
              {clientInvoices.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <input type="text" name="bidplatform" value={formData.bidplatform} onChange={handleChange} placeholder="Bid Platform" required />
        <input type="url" name="bidplatformURL" value={formData.bidplatformURL} onChange={handleChange} placeholder="Bid Platform URL" required />
        <input type="number" name="invoiceamount" value={formData.invoiceamount} onChange={handleChange} placeholder="Invoice Amount" required />

        <input type="date" name="projectstartdate" value={formData.projectstartdate} onChange={handleChange} required />
        <input type="date" name="completiondate" value={formData.completiondate} onChange={handleChange} required />

        <textarea name="testimonials" value={formData.testimonials} onChange={handleChange} placeholder="Testimonials" />

        <button type="submit">Submit</button>
      </form>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input,
        select,
        textarea {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
        textarea {
          resize: vertical;
          height: 80px;
        }
        button {
          padding: 12px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background: #005bb5;
        }
        .file-preview {
          margin-top: 10px;
          padding: 10px;
          background: #eef2ff;
          border-radius: 5px;
        }
        .file-preview h4 {
          margin-bottom: 5px;
        }
        .file-preview ul {
          list-style: none;
          padding: 0;
        }
        .file-preview li {
          background: #ffffff;
          padding: 5px;
          margin-bottom: 5px;
          border-radius: 3px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
