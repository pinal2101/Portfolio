import { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";
 
 export default function EditTopicForm({ id, topic }) {
   const router = useRouter();
 
   // Initialize form data state
   const [formData, setFormData] = useState({
     projectname: "",
     websitelink: "",
     technology: "",
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
 
   // Options for dropdowns
   
   const technologies = ["React", "Next.js","Wix","Squarespace","Webflow","HubSpot CMS",
    "Shopify","WooCommerce","BigCommerce","Magento","WordPress","Vue.js","Node.js","Express.js","Laravel (PHP)"];
   const pagebuilders = ["Elementor","Beaver Builder","WPBakery Page Builder",
    "Divi Builder","Gutenberg","Oxygen Builder"];
 
   // Update state when topic changes
   useEffect(() => {
     if (topic?.topic) {
       setFormData({
         projectname: topic.topic.projectname || "",
         websitelink: topic.topic.websitelink || "",
         technology: topic.topic.technology || "",
         description: topic.topic.description || "",
         pagebuilder: topic.topic.pagebuilder || "",
         clientname: topic.topic.clientname || "",
         clientinvoices: topic.topic.clientinvoices || [],
         bidplatform: topic.topic.bidplatform || "",
         bidplatformURL: topic.topic.bidplatformURL || "",
         invoiceamount: topic.topic.invoiceamount || "",
         projectstartdate: topic.topic.projectstartdate
           ? new Date(topic.topic.projectstartdate).toISOString().split("T")[0]
           : "",
         completiondate: topic.topic.completiondate
           ? new Date(topic.topic.completiondate).toISOString().split("T")[0]
           : "",
         testimonials: topic.topic.testimonials || "",
       });
     }
   }, [topic]);
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };
 
   const handleFileChange = (e) => {
     const files = Array.from(e.target.files);
 
     // Ensure only file objects are added
     const validFiles = files.filter((file) => file instanceof Blob);
 
     setFormData((prev) => ({
       ...prev,
       clientinvoices: [...prev.clientinvoices, ...validFiles], // Save valid file objects
     }));
   };
 
   const handleFileRemove = (index) => {
     const newFiles = formData.clientinvoices.filter((_, i) => i !== index);
     setFormData((prev) => ({
       ...prev,
       clientinvoices: newFiles,
     }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const formToSubmit = { ...formData };
       // Convert file objects to base64 strings if necessary for API
       formToSubmit.clientinvoices = await Promise.all(
         formData.clientinvoices.map(async (file) => {
           if (file instanceof Blob) {
             const base64 = await convertFileToBase64(file);
             return base64;
           }
           return file; // If the file is not a Blob, leave it unchanged
         })
       );
 
       const res = await fetch(`/api/topics/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formToSubmit),
       });
       router.push("/TopicList");
       if (!res.ok) throw new Error("Failed to update topic");
       // router.push("/TopicList");
 
     } catch (error) {
       console.error("Update failed:", error);
     }
   };
 
   // Utility function to convert file to base64 string (if needed)
   const convertFileToBase64 = (file) =>
     new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onloadend = () => resolve(reader.result);
       reader.onerror = reject;
       reader.readAsDataURL(file);
     });
 
   return (
     <div className="form-container">
       <h2 className="form-title">Edit Project</h2>
       <form onSubmit={handleSubmit} className="form">
         <label>Project Name:
           <input name="projectname" value={formData.projectname} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Website Link:
           <input name="websitelink" value={formData.websitelink} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Technology:
           <select name="technology" value={formData.technology} onChange={handleChange} className="input-field">
             {technologies.map((tech, index) => (
               <option key={index} value={tech}>{tech}</option>
             ))}
           </select>
         </label>
 
         <label>Description:
           <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Page Builder:
           <select name="pagebuilder" value={formData.pagebuilder} onChange={handleChange} className="input-field">
             {pagebuilders.map((builder, index) => (
               <option key={index} value={builder}>{builder}</option>
             ))}
           </select>
         </label>
 
         <label>Client Name:
           <input name="clientname" value={formData.clientname} onChange={handleChange} className="input-field" />
         </label>
 
         {/* Display existing invoices and allow file uploads */}
         <label>Client Invoices:
           <div className="invoice-list">
             {formData.clientinvoices.map((file, index) => (
               <div key={index} className="invoice-item">
                 <span>{file.name || file}</span>
                 <button type="button" onClick={() => handleFileRemove(index)} className="remove-btn">
                   Remove
                 </button>
               </div>
             ))}
           </div>
           <input type="file" multiple onChange={handleFileChange} className="input-field" />
         </label>
 
         <label>Bid Platform:
           <input name="bidplatform" value={formData.bidplatform} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Bid Platform URL:
           <input name="bidplatformURL" value={formData.bidplatformURL} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Invoice Amount:
           <input name="invoiceamount" type="number" value={formData.invoiceamount} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Project Start Date:
           <input name="projectstartdate" type="date" value={formData.projectstartdate} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Completion Date:
           <input name="completiondate" type="date" value={formData.completiondate} onChange={handleChange} className="input-field" />
         </label>
 
         <label>Testimonials:
           <textarea name="testimonials" value={formData.testimonials} onChange={handleChange} className="input-field" />
         </label>
 
         <button type="submit" className="submit-btn">Update Project</button>
       </form>
 
       {/* CSS */}
       <style jsx>{`
         .form-container {
           max-width: 600px;
           margin: 0 auto;
           padding: 30px;
           background-color: #fff;
           border-radius: 8px;
           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
         }
 
         .form-title {
           text-align: center;
           font-size: 24px;
           font-weight: bold;
           margin-bottom: 20px;
         }
 
         .form {
           display: flex;
           flex-direction: column;
           gap: 20px;
         }
 
         label {
           font-size: 16px;
           font-weight: 600;
         }
 
         .input-field {
           padding: 10px;
           font-size: 14px;
           border: 1px solid #ccc;
           border-radius: 4px;
           margin-top: 5px;
         }
 
         .input-field:focus {
           border-color: #5c6ac4;
           outline: none;
         }
 
         textarea {
           padding: 10px;
           font-size: 14px;
           border: 1px solid #ccc;
           border-radius: 4px;
           resize: vertical;
           min-height: 100px;
         }
 
         .submit-btn {
           padding: 12px 20px;
           background-color: #4CAF50;
           color: white;
           font-size: 16px;
           border: none;
           border-radius: 4px;
           cursor: pointer;
           transition: background-color 0.3s ease;
         }
 
         .submit-btn:hover {
           background-color: #45a049;
         }
 
         .invoice-list {
           margin: 10px 0;
         }
 
         .invoice-item {
           color: #0066cc;
           font-size: 14px;
           margin-bottom: 5px;
         }
 
         .remove-btn {
           background-color: #ff0000;
           color: white;
           border: none;
           cursor: pointer;
           padding: 5px;
           font-size: 12px;
           margin-left: 10px;
           border-radius: 4px;
         }
 
         .remove-btn:hover {
           background-color: #cc0000;
         }
       `}</style>
     </div>
   );
 }