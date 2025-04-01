"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip, CircularProgress, Typography, Box, Button, TextField, InputAdornment
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Logout as LogoutIcon, Search as SearchIcon } from "@mui/icons-material";

const TopicList = () => {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [searchTechnology, setSearchTechnology] = useState("");

  useEffect(() => {
    setHydrated(true);
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

  const handleDeleteSuccess = (deletedId) => {
    setTopics((prevTopics) => prevTopics.filter(topic => topic._id !== deletedId));
  };

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/users/logout');
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredTopics = topics.filter(topic =>
    (topic.technology?.toLowerCase() || "").includes(searchTechnology.toLowerCase())
  );

  if (!hydrated) return null;

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={6}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box maxWidth="lg" mx="auto" mt={4} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/addTopic')}
        >
          Add Topic
        </Button>

        {/* Combined Search Input & Button */}
        <TextField 
          label="Search by Technology"
          variant="outlined"
          size="small"
          value={searchTechnology}
          onChange={(e) => setSearchTechnology(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<LogoutIcon />} 
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>

      {filteredTopics.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          No topics available.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["Project Name", "Website Link", "Technology", "Description", "Page Builder",
                  "Client Name", "Client Invoices", "Bid Platform", "Bid Platform URL",
                  "Invoice Amount", "Project Start Date", "Completion Date", "Testimonials", "Actions"
                ].map((header, index) => (
                  <TableCell key={index} sx={{ whiteSpace: "nowrap", fontWeight: "bold", padding: "12px" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTopics.map((t) => (
                <TableRow key={t._id} hover>
                  <TableCell>{t.projectname}</TableCell>
                  <TableCell>
                    <Button href={t.websitelink} target="_blank" rel="noopener noreferrer" color="primary">
                      {t.websitelink}
                    </Button>
                  </TableCell>
                  <TableCell>{t.technology}</TableCell>                  
                  <TableCell sx={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.description}
                  </TableCell>
                  <TableCell>{t.pagebuilder}</TableCell>                 
                  <TableCell>{t.clientname}</TableCell>
                  <TableCell>
                     {Array.isArray(t.clientinvoices) && t.clientinvoices.length > 0 ? (
                       t.clientinvoices.map((file, index) => (
                         file &&  (
                           <a key={index} href={file} target="_blank" rel="noopener noreferrer">
                             <img src={file} alt={`Invoice ${index + 1}`} style={{ width: 40, height: 40, marginRight: 4, borderRadius: 4 }} />
                           </a>
                         ) 
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
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteSuccess(t._id)} color="error">
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
    </Box>
  );
};

export default TopicList;



