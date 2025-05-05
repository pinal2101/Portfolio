"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RemoveBtn from "../../components/RemoveBtn";
import ImportExportButtons from "./modules/ImportExportButtons"
import axios from "axios";
import {
  Box, Button, CircularProgress, IconButton, InputAdornment, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip,
  Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import {
  Edit as EditIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TopicList = () => {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchTag, setSearchTag] = useState("");
const [searchCategory, setSearchCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  

  useEffect(() => {
    setHydrated(true);
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics", { cache: "no-store" });
        const data = await res.json();
        setTopics(data?.topics || []);
      } catch (error) {
        toast.error("Error loading topics!");
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setTopics((prev) => prev.filter((t) => t._id !== deletedId));
    toast.success("Topic deleted successfully!");
  };

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/users/logout');
      if (response.status === 200) {
        toast.success("Logout successful!");
        setTimeout(() => {
          router.push("/login");
        }, 3000); 
      }
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error("Logout failed:", error);
    }
  };

  const filteredTopics = topics.filter((topic) => {
    const query = searchQuery.toLowerCase();
  
    const fieldsToSearch = [
      topic.projectname,
      ...(Array.isArray(topic.technology) ? topic.technology : []),
      ...(Array.isArray(topic.tag) ? topic.tag : []),
      ...(Array.isArray(topic.category) ? topic.category : []),
      topic.description,
      topic.pagebuilder,
      topic.clientname,
      topic.websitelink,
      topic.bidplatform,
      topic.bidplatformURL,
      topic.invoiceamount,
      topic.projectstartdate,
      topic.completiondate,
      topic.testimonials,
    ];
  
    return fieldsToSearch.some((field) =>
      String(field || "").toLowerCase().includes(query)
    );
  });
  

  if (!hydrated) return null;
  if (loading) return (
    <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
  );

  return (
    <>
    <ToastContainer />
    <ImportExportButtons />

    <Box maxWidth="lg" mx="auto" mt={4} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" onClick={() => router.push("/addTopic")}>Add Topic</Button>
        <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
  <TextField
    label="Search Topics"
    variant="outlined"
    size="small"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    sx={{ flex: 1 }} 
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Box>

        <Button variant="contained" color="primary" startIcon={<LogoutIcon />} onClick={onLogout}>
  Logout
</Button>

      </Box>

      {filteredTopics.length === 0 ? (
        <Typography align="center" color="textSecondary">No topics available.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["Project Name", "Technology", "Client", "Start Date", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTopics.map((t) => (
                <TableRow key={t._id} hover>
                  <TableCell>{t.projectname}</TableCell>
                  <TableCell>{t.technology}</TableCell>
                  <TableCell>{t.clientname}</TableCell>
                  <TableCell>{t.projectstartdate}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton component={Link} href={`/editTopic/${t._id}`} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <RemoveBtn id={t._id} onDeleteSuccess={handleDeleteSuccess} />
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => setSelectedTopic(t)} color="info">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

     
      <Dialog open={!!selectedTopic} onClose={() => setSelectedTopic(null)} maxWidth="md" fullWidth>
        <DialogTitle>Project Details</DialogTitle>

<DialogContent dividers>
  {selectedTopic && (
    <>
      <Box mb={2}>
        <Typography><strong>Website Link:</strong> <a href={selectedTopic.websitelink} target="_blank" rel="noopener noreferrer">{selectedTopic.websitelink}</a></Typography>
        <Typography><strong>Technology:</strong> {selectedTopic.technology}</Typography>
        <Typography><strong>Tag:</strong> {selectedTopic.tag}</Typography>
        <Typography><strong>Category:</strong> {selectedTopic.category}</Typography>
        <Typography><strong>Description:</strong> {selectedTopic.description}</Typography>
        <Typography><strong>Page Builder:</strong> {selectedTopic.pagebuilder}</Typography>
        <Typography><strong>Client Name:</strong> {selectedTopic.clientname}</Typography>
      </Box>
      {selectedTopic?.clientinvoices?.map((file, i) => {
  if (typeof file !== "string") return null;

  const fileName = decodeURIComponent(file.split('/').pop());

  return (
    <Box key={i} sx={{ textAlign: 'left', m: 1 }}>
      <a href={file} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
        {fileName}
      </a>
    </Box>
  );
})}




      <Box mt={2}>
        <Typography><strong>Bid Platform:</strong> {selectedTopic.bidplatform}</Typography>
        <Typography><strong>Bid Platform URL:</strong> <a href={selectedTopic.bidplatformURL} target="_blank" rel="noopener noreferrer">{selectedTopic.bidplatformURL}</a></Typography>
        <Typography><strong>Invoice Amount:</strong> ₹{selectedTopic.invoiceamount}</Typography>
        <Typography><strong>Start Date:</strong> {selectedTopic.projectstartdate}</Typography>
        <Typography><strong>Completion Date:</strong> {selectedTopic.completiondate}</Typography>
        <Typography><strong>Testimonials:</strong> {selectedTopic.testimonials}</Typography>
      </Box>
    </>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedTopic(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
};

export default TopicList;

