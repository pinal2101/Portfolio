"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { TextField, Button, Select, MenuItem, Typography, Container, Box, InputLabel, FormControl, OutlinedInput, Chip } from "@mui/material";

export default function AddTopicPage() {
  const [formData, setFormData] = useState({
    projectname: "",
    websitelink: "",
    technology: [],
    description: "",
    pagebuilder: [],
    clientname: "",
    bidplatform: "",
    bidplatformURL: "",
    invoiceamount: "",
    projectstartdate: "",
    completiondate: "",
    testimonials: "",
  });

  const [clientInvoices, setClientInvoices] = useState([]); // Store selected files
  const [selectedFiles, setSelectedFiles] = useState([]); // Display selected file names
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select change
  const handleMultiSelectChange = (name) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setClientInvoices(files);
    setSelectedFiles(files.map((file) => file.name)); // Display selected file names
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => data.append(key, item));
      } else {
        data.append(key, value);
      }
    });

    // Append multiple files correctly
    clientInvoices.forEach((file, index) => {
      data.append(`clientinvoices`, file); // Ensure the backend handles this correctly
    });

    try {
      const response = await fetch(`/api/topics`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      alert("Topic added successfully!");
      router.push("/");

    } catch (error) {
      console.error("Submit Error:", error);
      alert("Error adding topic.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ backgroundColor: "#f9f9f9", p: 3, borderRadius: 2, boxShadow: 2, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add a New Topic
        </Typography>
        <form onSubmit={handleSubmit}>

          {/* Project Name */}
          <TextField fullWidth label="Project Name" name="projectname" value={formData.projectname} onChange={handleChange} required margin="normal" />

          {/* Website Link */}
          <TextField fullWidth label="Website Link" name="websitelink" value={formData.websitelink} onChange={handleChange} required margin="normal" />

          {/* Technology Multi-select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Technology</InputLabel>
            <Select multiple value={formData.technology} onChange={handleMultiSelectChange("technology")} input={<OutlinedInput label="Technology" />} renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
              {["React", "Node", "Angular", "Next.js"].map((tech) => (
                <MenuItem key={tech} value={tech}>{tech}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Description */}
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} required multiline rows={3} margin="normal" />

          {/* Page Builder Multi-select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Page Builder</InputLabel>
            <Select multiple value={formData.pagebuilder} onChange={handleMultiSelectChange("pagebuilder")} input={<OutlinedInput label="Page Builder" />} renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
              {["A", "B", "C"].map((builder) => (
                <MenuItem key={builder} value={builder}>{builder}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Client Name */}
          <TextField fullWidth label="Client Name" name="clientname" value={formData.clientname} onChange={handleChange} required margin="normal" />

          {/* File Upload */}
          <input type="file" multiple onChange={handleFileChange} required />

          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: "#eef2ff", borderRadius: 1 }}>
              <Typography variant="h6">Selected Files:</Typography>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </Box>
          )}

          {/* Bid Platform */}
          <TextField fullWidth label="Bid Platform" name="bidplatform" value={formData.bidplatform} onChange={handleChange} required margin="normal" />

          {/* Bid Platform URL */}
          <TextField fullWidth label="Bid Platform URL" name="bidplatformURL" type="url" value={formData.bidplatformURL} onChange={handleChange} required margin="normal" />

          {/* Invoice Amount */}
          <TextField fullWidth label="Invoice Amount" name="invoiceamount" type="number" value={formData.invoiceamount} onChange={handleChange} required margin="normal" />

          {/* Project Start Date */}
          <TextField fullWidth label="Project Start Date" name="projectstartdate" type="date" value={formData.projectstartdate} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />

          {/* Completion Date */}
          <TextField fullWidth label="Completion Date" name="completiondate" type="date" value={formData.completiondate} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />

          {/* Testimonials */}
          <TextField fullWidth label="Testimonials" name="testimonials" value={formData.testimonials} onChange={handleChange} multiline rows={2} margin="normal" />

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>

        </form>
      </Box>
    </Container>
  );
}  
