
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt, HiTrash } from "react-icons/hi";

// const TopicsList = () => {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await fetch("/api/topics", { cache: "no-store" });
//         if (!res.ok) throw new Error("Failed to fetch topics");
//         const data = await res.json();
//         setTopics(data?.topics || []);
//       } catch (error) {
//         console.error("Error loading topics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopics();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading topics...</p>;

//   return (
//     <div className="max-w-7xl mx-auto mt-6 p-4">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Topics List</h1>

//       {topics.length === 0 ? (
//         <p className="text-center text-gray-500">No topics available.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white rounded-lg overflow-hidden">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="border border-gray-300 px-4 py-2">Project Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Website Link</th>
//                 <th className="border border-gray-300 px-4 py-2">Technology</th>
//                 <th className="border border-gray-300 px-4 py-2">Description</th>
//                 <th className="border border-gray-300 px-4 py-2">Page Builder</th>
//                 <th className="border border-gray-300 px-4 py-2">Client Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Client Invoices</th>
//                 <th className="border border-gray-300 px-4 py-2">Bid Platform</th>
//                 <th className="border border-gray-300 px-4 py-2">Bid Platform URL</th>
//                 <th className="border border-gray-300 px-4 py-2">Invoice Amount</th>
//                 <th className="border border-gray-300 px-4 py-2">Project Start Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Completion Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Testimonials</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topics.map((t, index) => (
//                 <tr key={t._id} className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}>
//                   <td className="border border-gray-300 px-4 py-2">{t.projectname}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <a href={t.websitelink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                       {t.websitelink}
//                     </a>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">{t.technology}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.description}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.pagebuilder}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.clientname}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.clientinvoices}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.bidplatform}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <a href={t.bidplatformURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                       {t.bidplatformURL}
//                     </a>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">{t.invoiceamount}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.projectstartdate}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.completiondate}</td>
//                   <td className="border border-gray-300 px-4 py-2">{t.testimonials}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <div className="flex items-center justify-center gap-3">
//                       {/* Update Button */}
//                       <Link href={`/editTopic/${t._id}`}>
//                         <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
//                           <HiPencilAlt size={18} />
//                           Update
//                         </button>
//                       </Link>

//                       {/* Delete Button */}
//                       <button onClick={() => RemoveBtn({ id: t._id })} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
//                         <HiTrash size={18} />
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicsList;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Tooltip, CircularProgress, Typography
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data?.topics || []);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <div className="flex justify-center mt-6"><CircularProgress /></div>;

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4">
      <Typography variant="h4" align="center" gutterBottom>
        Topics List
      </Typography>

      {topics.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          No topics available.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Project Name</b></TableCell>
                <TableCell><b>Website Link</b></TableCell>
                <TableCell><b>Technology</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Page Builder</b></TableCell>
                <TableCell><b>Client Name</b></TableCell>
                <TableCell><b>Client Invoices</b></TableCell>
                <TableCell><b>Bid Platform</b></TableCell>
                <TableCell><b>Bid Platform URL</b></TableCell>
                <TableCell><b>Invoice Amount</b></TableCell>
                <TableCell><b>Project Start Date</b></TableCell>
                <TableCell><b>Completion Date</b></TableCell>
                <TableCell><b>Testimonials</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.map((t) => (
                <TableRow key={t._id} hover>
                  <TableCell>{t.projectname}</TableCell>
                  <TableCell>
                    <a href={t.websitelink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {t.websitelink}
                    </a>
                  </TableCell>
                  <TableCell>{t.technology}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>{t.pagebuilder}</TableCell>
                  <TableCell>{t.clientname}</TableCell>
                  <TableCell>{t.clientinvoices}</TableCell>
                  <TableCell>{t.bidplatform}</TableCell>
                  <TableCell>
                    <a href={t.bidplatformURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {t.bidplatformURL}
                    </a>
                  </TableCell>
                  <TableCell>{t.invoiceamount}</TableCell>
                  <TableCell>{t.projectstartdate}</TableCell>
                  <TableCell>{t.completiondate}</TableCell>
                  <TableCell>{t.testimonials}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton component={Link} href={`/editTopic/${t._id}`} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => RemoveBtn({ id: t._id })}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TopicsList;
