

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip, CircularProgress, Typography
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

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

  // ✅ Function to remove deleted topic from the list
  const handleDeleteSuccess = (deletedId) => {
    setTopics((prevTopics) => prevTopics.filter(topic => topic._id !== deletedId));
  };

  if (loading) return <div className="flex justify-center mt-6"><CircularProgress /></div>;

  return (
    <div className="max-w-full mx-auto mt-6 p-4">
      <Typography variant="h4" align="center" gutterBottom>
        Topics List
      </Typography>

      {topics.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          No topics available.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ display: "block", overflow: "visible" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {[
                  "Project Name", "Website Link", "Technology", "Description", "Page Builder",
                  "Client Name", "Client Invoices", "Bid Platform", "Bid Platform URL",
                  "Invoice Amount", "Project Start Date", "Completion Date", "Testimonials", "Actions"
                ].map((header, index) => (
                  <TableCell key={index} sx={{ whiteSpace: "nowrap", fontWeight: "bold", padding: "6px 12px" }}>
                    {header}
                  </TableCell>
                ))}
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
                  <TableCell sx={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.description}
                  </TableCell>
                  <TableCell>{t.pagebuilder}</TableCell>
                  <TableCell>{t.clientname}</TableCell>

                  {/* ✅ Fixed: Ensure `clientinvoices` is an array before mapping */}
                  <TableCell>
                    {Array.isArray(t.clientinvoices) && t.clientinvoices.length > 0 ? (
                      t.clientinvoices.map((file, index) => (
                        file ? (
                          <div key={index} className="p-1">
                            <a href={file} target="_blank" rel="noopener noreferrer">
                              <img
                                src={file}
                                alt={`Invoice ${index + 1}`}
                                className="w-16 h-16 object-cover border rounded-md shadow-md hover:shadow-lg"
                              />
                            </a>
                          </div>
                        ) : null
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">No invoices</Typography>
                    )}
                  </TableCell>

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
                    {/* ✅ Fixed: Pass delete handler properly */}
                    <RemoveBtn id={t._id} onDeleteSuccess={() => handleDeleteSuccess(t._id)} />
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
