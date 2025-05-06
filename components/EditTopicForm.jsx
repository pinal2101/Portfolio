// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function EditTopicForm({ id, topic }) {
//   const router = useRouter();

//   const technologies = [
//     "React", "Next.js", "Wix", "Squarespace", "Webflow", "HubSpot CMS",
//     "Shopify", "WooCommerce", "BigCommerce", "Magento", "WordPress",
//     "Vue.js", "Node.js", "Express.js", "Laravel (PHP)"
//   ];

//   const pagebuilders = [
//     "Elementor", "Beaver Builder", "WPBakery Page Builder",
//     "Divi Builder", "Gutenberg", "Oxygen Builder"
//   ];

//   const [formData, setFormData] = useState({
//     projectname: "",
//     websitelink: "",
//     technology: "",
//     description: "",
//     pagebuilder: "",
//     clientname: "",
//     clientinvoices: [],
//     bidplatform: "",
//     bidplatformURL: "",
//     invoiceamount: "",
//     projectstartdate: "",
//     completiondate: "",
//     testimonials: "",
//   });

//   useEffect(() => {
//     if (topic?.topic) {
//       const t = topic.topic;
  
//       // Add technology if not already in list
//       if (t.technology && !technologies.includes(t.technology)) {
//         technologies.push(t.technology);
//       }
  
//       // Add pagebuilder if not already in list
//       if (t.pagebuilder && !pagebuilders.includes(t.pagebuilder)) {
//         pagebuilders.push(t.pagebuilder);
//       }
  
//       setFormData({
//         projectname: t.projectname || "",
//         websitelink: t.websitelink || "",
//         technology: t.technology || "",
//         description: t.description || "",
//         pagebuilder: t.pagebuilder || "",
//         clientname: t.clientname || "",
//         clientinvoices: (t.clientinvoices || []).map((url) => ({ url })),
//         bidplatform: t.bidplatform || "",
//         bidplatformURL: t.bidplatformURL || "",
//         invoiceamount: t.invoiceamount || "",
//         projectstartdate: t.projectstartdate
//           ? new Date(t.projectstartdate).toISOString().split("T")[0]
//           : "",
//         completiondate: t.completiondate
//           ? new Date(t.completiondate).toISOString().split("T")[0]
//           : "",
//         testimonials: t.testimonials || "",
//       });
//     }
//   }, [topic]);
  
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files).map((file) => ({ file }));
//     setFormData((prev) => ({
//       ...prev,
//       clientinvoices: [...prev.clientinvoices, ...files],
//     }));
//   };

//   const handleFileRemove = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       clientinvoices: prev.clientinvoices.filter((_, i) => i !== index),
//     }));
//   };

//   const convertFileToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formToSubmit = { ...formData };
  
//       const uploadedURLs = await Promise.all(
//         formData.clientinvoices.map(async (item) => {
//           if (item.file) {
//             const base64 = await convertFileToBase64(item.file);
  
//             const res = await fetch("/api/upload", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ file: base64 }),
//             });
  
//             const data = await res.json();
//             return data.url; 
//           }
//           return item.url; 
//         })
//       );
  
//       formToSubmit.clientinvoices = uploadedURLs;
  
//       const res = await fetch(`/api/topics/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formToSubmit),
//       });
  
//       if (!res.ok) throw new Error("Failed to update topic");
//       toast.success("Topic updated successfully!");
//       setTimeout(() => {
//         router.push("/TopicList");
//       }, 1000);
//     } catch (error) {
//       console.error("Update failed:", error);
//      toast.error("Failed to update topic!");
//     }
//   };
  
//   return (
//     <>
//     <ToastContainer position="top-right" />

//     <div className="edit-form-wrapper">
//       <div className="form-header">
//         <h2>Edit Project</h2>
//         <button onClick={() => router.push("/TopicList")} className="back-btn">Back</button>
//       </div>

//       <form onSubmit={handleSubmit} className="edit-form">
//         <label>Project Name:
//           <input name="projectname" value={formData.projectname} onChange={handleChange} />
//         </label>

//         <label>Website Link:
//           <input name="websitelink" value={formData.websitelink} onChange={handleChange} />
//         </label>

//         <label>Technology:
//           <select name="technology" value={formData.technology} onChange={handleChange}>
//             <option value="">Select Technology</option>
//             {technologies.map((tech) => (
//               <option key={tech} value={tech}>{tech}</option>
//             ))}
//           </select>
//         </label>

//         <label>Description:
//           <textarea name="description" value={formData.description} onChange={handleChange} />
//         </label>

//         <label>Page Builder:
//           <select name="pagebuilder" value={formData.pagebuilder} onChange={handleChange}>
//             <option value="">Select Page Builder</option>
//             {pagebuilders.map((builder) => (
//               <option key={builder} value={builder}>{builder}</option>
//             ))}
//           </select>
//         </label>

//         <label>Client Name:
//           <input name="clientname" value={formData.clientname} onChange={handleChange} />
//         </label>

// <label className="block mb-4 font-semibold text-gray-700">
//   Client Invoices:
//   <div className="mt-2 space-y-2">
//     {formData.clientinvoices.map((item, index) => {
//       console.log("item.url",item.url);
      
//       return(
        
//       <div
//         key={index}
//         className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm"
//       >
//         <div className="text-sm text-blue-600 truncate max-w-[75%]">
//           {item.url ? (
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:underline"
//             >
//               {item.url.split("/").pop()}
              
//             </a>
//           ) : item.file ? (
//             <span>{item.file.name}</span>
//           ) : (
//             <span>Unnamed file</span>
//           )}
//         </div>
//         <button
//           type="button"
//           onClick={() => handleFileRemove(index)}
//           className="ml-4 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Remove
//         </button>
//       </div>
//       )
// })}
//   </div>.
//   <input
//     type="file"
//     multiple
//     onChange={handleFileChange}
//     className="mt-3 block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//   />
// </label>


//         <label>Bid Platform:
//           <input name="bidplatform" value={formData.bidplatform} onChange={handleChange} />
//         </label>

//         <label>Bid Platform URL:
//           <input name="bidplatformURL" value={formData.bidplatformURL} onChange={handleChange} />
//         </label>

//         <label>Invoice Amount:
//           <input name="invoiceamount" type="number" value={formData.invoiceamount} onChange={handleChange} />
//         </label>

//         <label>Project Start Date:
//           <input name="projectstartdate" type="date" value={formData.projectstartdate} onChange={handleChange} />
//         </label>

//         <label>Completion Date:
//           <input name="completiondate" type="date" value={formData.completiondate} onChange={handleChange} />
//         </label>

//         <label>Testimonials:
//           <textarea name="testimonials" value={formData.testimonials} onChange={handleChange} />
//         </label>

//         <button type="submit" className="submit-btn">Update Project</button>
//       </form>

//       <style jsx>{`
//         .edit-form-wrapper {
//           max-width: 700px;
//           margin: 40px auto;
//           background: #fdfdfd;
//           padding: 30px;
//           border-radius: 10px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .form-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .form-header h2 {
//           font-size: 22px;
//           font-weight: 700;
//         }

//         .back-btn {
//           padding: 8px 16px;
//           background-color: #666;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .edit-form {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//           margin-top: 20px;
//         }

//         label {
//           font-weight: 600;
//           font-size: 15px;
//           display: flex;
//           flex-direction: column;
//         }

//         input, select, textarea {
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//           font-size: 14px;
//           margin-top: 5px;
//         }

//         .invoice-list {
//           margin-top: 10px;
//         }

//         .invoice-item {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: #f0f0f0;
//           padding: 8px 12px;
//           border-radius: 4px;
//           margin-bottom: 6px;
//         }

//         .invoice-item span, .invoice-item a {
//           font-size: 13px;
//           color: #333;
//         }

//         .invoice-item button {
//           background-color: #e53935;
//           color: white;
//           padding: 4px 10px;
//           font-size: 12px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .submit-btn {
//           padding: 12px;
//           background-color: #1976d2;
//           color: white;
//           font-size: 16px;
//           font-weight: 600;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: background-color 0.2s ease;
//         }

//         .submit-btn:hover {
//           background-color: #125a9c;
//         }
//       `}</style>
//     </div>
//     </>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTopicForm({ id, topic }) {
  const router = useRouter();

  const technologies = [
    "React", "Next.js", "Wix", "Squarespace", "Webflow", "HubSpot CMS",
    "Shopify", "WooCommerce", "BigCommerce", "Magento", "WordPress",
    "Vue.js", "Node.js", "Express.js", "Laravel (PHP)"
  ];

  const pagebuilders = [
    "Elementor", "Beaver Builder", "WPBakery Page Builder",
    "Divi Builder", "Gutenberg", "Oxygen Builder"
  ];

  const [formData, setFormData] = useState({
    projectname: "",
    websitelink: "",
    technology: "",
    tag: [],
    Category: [],
    description: "",
    pagebuilder: "",
    clientname: "",
    clientinvoices: [],
    bidplatform: "",
    bidplatformURL: "",
    invoiceamount: "",
    projectstartdate: "",
    completiondate: "",
    testimonials: "",
  });

  useEffect(() => {
    if (topic?.topic) {
      const t = topic.topic;
  
      // Add technology if not already in list
      if (t.technology && !technologies.includes(t.technology)) {
        technologies.push(t.technology);
      }
  
      // Add pagebuilder if not already in list
      if (t.pagebuilder && !pagebuilders.includes(t.pagebuilder)) {
        pagebuilders.push(t.pagebuilder);
      }
  
      setFormData({
        projectname: t.projectname || "",
        websitelink: t.websitelink || "",
        technology: t.technology || "",
        description: t.description || "",
        pagebuilder: t.pagebuilder || "",
        clientname: t.clientname || "",
        clientinvoices: (t.clientinvoices || []).map((url) => ({ url })),
        bidplatform: t.bidplatform || "",
        bidplatformURL: t.bidplatformURL || "",
        invoiceamount: t.invoiceamount || "",
        projectstartdate: t.projectstartdate
          ? new Date(t.projectstartdate).toISOString().split("T")[0]
          : "",
        completiondate: t.completiondate
          ? new Date(t.completiondate).toISOString().split("T")[0]
          : "",
        testimonials: t.testimonials || "",
      });
    }
  }, [topic]);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({ file }));
    setFormData((prev) => ({
      ...prev,
      clientinvoices: [...prev.clientinvoices, ...files],
    }));
  };

  const handleFileRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      clientinvoices: prev.clientinvoices.filter((_, i) => i !== index),
    }));
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formToSubmit = { ...formData };

      formToSubmit.clientinvoices = await Promise.all(
        formData.clientinvoices.map(async (item) => {
          if (item.file) {
            const base64 = await convertFileToBase64(item.file);
            return base64;
          }
          return item.url;
        })
      );

      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToSubmit),
      });

      if (!res.ok) throw new Error("Failed to update topic");
      
    toast.success("Project updated successfully!");
    setTimeout(() => router.push("/TopicList"), 1200);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="edit-form-wrapper">
      <div className="form-header">
        <h2>Edit Project</h2>
        <button onClick={() => router.push("/TopicList")} className="back-btn">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Project Name:
          <input name="projectname" value={formData.projectname} onChange={handleChange} />
        </label>

        <label>Website Link:
          <input name="websitelink" value={formData.websitelink} onChange={handleChange} />
        </label>

        <label>Technology:
          <select name="technology" value={formData.technology} onChange={handleChange}>
            <option value="">Select Technology</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </label>

        <label>Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label>Page Builder:
          <select name="pagebuilder" value={formData.pagebuilder} onChange={handleChange}>
            <option value="">Select Page Builder</option>
            {pagebuilders.map((builder) => (
              <option key={builder} value={builder}>{builder}</option>
            ))}
          </select>
        </label>

        <label>Client Name:
          <input name="clientname" value={formData.clientname} onChange={handleChange} />
        </label>

        <label>Client Invoices:
          <div className="invoice-list">
            {formData.clientinvoices.map((item, index) => (
              <div key={index} className="invoice-item">
                {item.url ? (
  <a href={item.url} target="_blank" rel="noopener noreferrer">
    {decodeURIComponent(item.url.split("/").pop().split("?")[0])}
  </a>
) : (
  <span>{item.file?.name}</span>
)}

                <button type="button" onClick={() => handleFileRemove(index)}>Remove</button>
              </div>
            ))}
          </div>
          <input type="file" multiple onChange={handleFileChange} />
        </label>

        <label>Bid Platform:
          <input name="bidplatform" value={formData.bidplatform} onChange={handleChange} />
        </label>

        <label>Bid Platform URL:
          <input name="bidplatformURL" value={formData.bidplatformURL} onChange={handleChange} />
        </label>

        <label>Invoice Amount:
          <input name="invoiceamount" type="number" value={formData.invoiceamount} onChange={handleChange} />
        </label>

        <label>Project Start Date:
          <input name="projectstartdate" type="date" value={formData.projectstartdate} onChange={handleChange} />
        </label>

        <label>Completion Date:
          <input name="completiondate" type="date" value={formData.completiondate} onChange={handleChange} />
        </label>

        <label>Testimonials:
          <textarea name="testimonials" value={formData.testimonials} onChange={handleChange} />
        </label>

        <button type="submit" className="submit-btn">Update Project</button>
      </form>

      <style jsx>{`
        .edit-form-wrapper {
          max-width: 700px;
          margin: 40px auto;
          background: #fdfdfd;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-header h2 {
          font-size: 22px;
          font-weight: 700;
        }

        .back-btn {
          padding: 8px 16px;
          background-color: #666;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }

        label {
          font-weight: 600;
          font-size: 15px;
          display: flex;
          flex-direction: column;
        }

        input, select, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 5px;
        }

        .invoice-list {
          margin-top: 10px;
        }

        .invoice-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f0f0f0;
          padding: 8px 12px;
          border-radius: 4px;
          margin-bottom: 6px;
        }

       .invoice-item a, .invoice-item span {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}


        .invoice-item button {
          background-color: #e53935;
          color: white;
          padding: 4px 10px;
          font-size: 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn {
          padding: 12px;
          background-color: #1976d2;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-btn:hover {
          background-color: #125a9c;
        }
      `}</style>
    </div>
  );
}
