// "use client";

// import { useRouter } from "next/navigation";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// // Validation Schema
// const validationSchema = Yup.object().shape({
//   projectName: Yup.string().required("Project Name is required"),
//   websiteLink: Yup.string().url("Invalid URL").required("Website Link is required"),
//   technology: Yup.string().required("Technology is required"),
//   description: Yup.string().required("Description is required"),
//   pageBuilder: Yup.string().required("Page Builder is required"),
//   clientName: Yup.string().required("Client Name is required"),
//   clientInvoices: Yup.string().required("Client Invoices are required"),
//   bidPlatform: Yup.string().required("Bid Platform is required"),
//   bidPlatformURL: Yup.string().url("Invalid URL").required("Bid Platform URL is required"),
//   invoiceAmount: Yup.number().positive("Must be positive").required("Invoice Amount is required"),
//   projectStartDate: Yup.date().required("Start Date is required"),
//   completionDate: Yup.date().required("Completion Date is required"),
//   testimonials: Yup.string(),
// });

// export default function AddTopic() {
//   const router = useRouter();

//   return (
//     <Formik
//       initialValues={{
//         projectName: "",
//         websiteLink: "",
//         technology: "",
//         description: "",
//         pageBuilder: "",
//         clientName: "",
//         clientInvoices: "",
//         bidPlatform: "",
//         bidPlatformURL: "",
//         invoiceAmount: "",
//         projectStartDate: new Date().toISOString().split("T")[0], // Default to today
//         completionDate: new Date().toISOString().split("T")[0],
//         testimonials: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { setSubmitting, resetForm }) => {
        
//         try {
//           const res = await fetch("http://localhost:3000/api/topics", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(values),
            
//           });
//           console.log(values);
          

//           if (res.ok) {
//             resetForm();
//             router.push("/");
//           } else {
//             throw new Error("Failed to create a topic");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ isSubmitting, errors, touched }) => (
//         <Form className="flex flex-col gap-3 p-6 border rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Add New Topic</h2>

//           <div>
//             <label>Project Name</label>
//             <Field type="text" name="projectName" className="border p-2 w-full rounded" />
//             {errors.projectName && touched.projectName && <div className="text-red-500">{errors.projectName}</div>}
//           </div>

//           <div>
//             <label>Website Link</label>
//             <Field type="url" name="websiteLink" className="border p-2 w-full rounded" />
//             {errors.websiteLink && touched.websiteLink && <div className="text-red-500">{errors.websiteLink}</div>}
//           </div>

//           <div>
//             <label>Technology</label>
//             <Field as="select" name="technology" className="border p-2 w-full rounded">
//               <option value="">Select Technology</option>
//               <option value="React">React</option>
//               <option value="Next.js">Next.js</option>
//               <option value="Node.js">Node.js</option>
//               <option value="Express">Express</option>
//               <option value="JavaScript">JavaScript</option>
//             </Field>
//             {errors.technology && touched.technology && <div className="text-red-500">{errors.technology}</div>}
//           </div>

//           <div>
//             <label>Description</label>
//             <Field as="textarea" name="description" className="border p-2 w-full rounded" />
//             {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
//           </div>
//           <div>
//             <label>pageBuilder</label>
//             <Field type="text" name="pageBuilder" className="border p-2 w-full rounded" />
//             {errors.pageBuilder && touched.pageBuilder && <div className="text-red-500">{errors.pageBuilder}</div>}
//           </div>

//           <div>
//             <label>Client Name</label>
//             <Field type="text" name="clientName" className="border p-2 w-full rounded" />
//             {errors.clientName && touched.clientName && <div className="text-red-500">{errors.clientName}</div>}
//           </div>
//           <div>
//             <label>ClientInvoices</label>
//             <Field type="text" name="clientInvoices" className="border p-2 w-full rounded" />
//             {errors.clientInvoices && touched.clientInvoices && <div className="text-red-500">{errors.clientInvoices}</div>}
//           </div>

//           <div>
//             <label>Bid Platform</label>
//             <Field type="text" name="bidPlatform" className="border p-2 w-full rounded" />
//             {errors.bidPlatform && touched.bidPlatform && <div className="text-red-500">{errors.bidPlatform}</div>}
//           </div>

//           <div>
//             <label>Bid Platform URL</label>
//             <Field type="url" name="bidPlatformURL" className="border p-2 w-full rounded" />
//             {errors.bidPlatformURL && touched.bidPlatformURL && <div className="text-red-500">{errors.bidPlatformURL}</div>}
//           </div>

//           <div>
//             <label>Invoice Amount</label>
//             <Field type="number" name="invoiceAmount" className="border p-2 w-full rounded" />
//             {errors.invoiceAmount && touched.invoiceAmount && <div className="text-red-500">{errors.invoiceAmount}</div>}
//           </div>

//           <div>
//             <label>Project Start Date</label>
//             <Field type="date" name="projectStartDate" className="border p-2 w-full rounded" />
//             {errors.projectStartDate && touched.projectStartDate && <div className="text-red-500">{errors.projectStartDate}</div>}
//           </div>

//           <div>
//             <label>Completion Date</label>
//             <Field type="date" name="completionDate" className="border p-2 w-full rounded" />
//             {errors.completionDate && touched.completionDate && <div className="text-red-500">{errors.completionDate}</div>}
//           </div>

//           <div>
//             <label>Testimonials</label>
//             <Field as="textarea" name="testimonials" className="border p-2 w-full rounded" />
//             {errors.testimonials && touched.testimonials && <div className="text-red-500">{errors.testimonials}</div>}
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold"
//           >
//             {isSubmitting ? "Submitting..." : "Submi"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }

"use client";  // Important for Next.js App Router

import { useState } from "react";

export default function AddTopicPage() {
  const [formData, setFormData] = useState({
    projectname: "",
    websitelink: "",
    technology: "React",
    description: "",
    pagebuilder: "Elementor",
    clientname: "",
    clientinvoices: "",
    bidplatform: "",
    bidplatformURL: "",
    invoiceamount: "",
    projectstartdate: "",
    completiondate: "",
    testimonials: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Topic added successfully!");
        setFormData({
          projectname: "",
          websitelink: "",
          technology: "React",
          description: "",
          pagebuilder: "Elementor",
          clientname: "",
          clientinvoices: "",
          bidplatform: "",
          bidplatformURL: "",
          invoiceamount: "",
          projectstartdate: "",
          completiondate: "",
          testimonials: "",
        });
      } else {
        alert("Error adding topic.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
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
          <option value="Vue">Vue</option>
          <option value="Angular">Angular</option>
          <option value="Next.js">Next.js</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />

        <select name="pagebuilder" value={formData.pagebuilder} onChange={handleChange} required>
          <option value="Elementor">Elementor</option>
          <option value="Gutenberg">Gutenberg</option>
          <option value="Divi">Divi</option>
        </select>

        <input type="text" name="clientname" value={formData.clientname} onChange={handleChange} placeholder="Client Name" required />
        <input type="text" name="clientinvoices" value={formData.clientinvoices} onChange={handleChange} placeholder="Client Invoices" required />
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
      `}</style>
    </div>
  );
}

