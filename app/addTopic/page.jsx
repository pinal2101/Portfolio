"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { TextField, Button, Select, MenuItem, Typography, Container, Box, InputLabel, FormControl, OutlinedInput, Chip } from "@mui/material";
import { Category } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddTopicPage() {
  const [formData, setFormData] = useState({
    projectname: "",
    websitelink: "",
    technology: [],
    tag: [],
    Category: [],
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

  const [clientInvoices, setClientInvoices] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const router = useRouter();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleMultiSelectChange = (name) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value,
    })); 
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
    
    setClientInvoices((prev) => [...prev, ...files]); 
    setSelectedFiles((prev) => [...prev, ...files.map((file) => file.name)]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setClientInvoices((prev) => prev.filter((_, i) => i !== indexToRemove));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  const handleDeleteChip = (field, valueToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((value) => value !== valueToRemove),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => data.append(key, item));
      } else {
        data.append(key, value);
      }
    });
    clientInvoices.forEach((file) => {
      data.append(`clientinvoices`, file); 
      console.log('file', file);
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

       toast.success("Topic added successfully!");

  setTimeout(() => {
    router.push("/TopicList");
  }, 1000);

    } catch (error) {
      toast.error("Error adding topic.");
      console.error("Submit Error:", error);
      
    }
  };

  return (
    
    <Container maxWidth="md">
      <Box sx={{ backgroundColor: "#f9f9f9", p: 3, borderRadius: 2, boxShadow: 2, mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4">Add a New Topic</Typography>
          <Button variant="outlined" onClick={() => router.push("/TopicList")}>
            Back
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <TextField fullWidth label="Project Name" name="projectname" value={formData.projectname} onChange={handleChange} required margin="normal" />

          {/* Website Link */}
          <TextField fullWidth label="Website Link" name="websitelink" value={formData.websitelink} onChange={handleChange} required margin="normal" />

          {/* Technology Multi-select */}
          <FormControl fullWidth margin="normal">
  <InputLabel>Technology</InputLabel>
  <Select
    multiple
    value={formData.technology}
    onChange={handleMultiSelectChange("technology")}
    input={<OutlinedInput label="Technology" />}
    renderValue={(selected) => (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value) => (
          <Chip
            key={value}
            label={value}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onDelete={() => handleDeleteChip("technology", value)}
          />
          ))}
      </Box>
    )}
  >
    {[
      "React", "Next.js", "Wix", "Squarespace", "Webflow", "HubSpot CMS",
      "Shopify", "WooCommerce", "BigCommerce", "Magento", "WordPress",
      "Vue.js", "Node.js", "Express.js", "Laravel (PHP)"
    ].map((tech) => (
      <MenuItem key={tech} value={tech}>
        {tech}
      </MenuItem>
    ))}
  </Select>
</FormControl>


          <FormControl fullWidth margin="normal">
            <InputLabel>Tag</InputLabel>
            <Select multiple value={formData.tag} onChange={handleMultiSelectChange("tag")} input={<OutlinedInput label="Tag" />} 
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                  key={value}
                  label={value}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onDelete={() => handleDeleteChip("tag", value)}
                />
                ))}
              </Box>
            )}>
              {["A","B","C"].map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select multiple value={formData.Category} onChange={handleMultiSelectChange("category")} input={<OutlinedInput label="Category" />} 
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  
                  <Chip
                  key={value}
                  label={value}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  
                  onDelete={() => handleDeleteChip("category", value)}
                />
                ))}
              </Box>
            )}>
              {["A","B","C"].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                  </MenuItem>
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
                   <Chip
                   key={value}
                   label={value}
                   onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onDelete={() => handleDeleteChip("page Builder", value)}
                />
                ))}
              </Box>
            )}>
              {["Elementor","Beaver Builder","WPBakery Page Builder","Divi Builder","Gutenberg","Oxygen Builder"].map((builder) => (
                <MenuItem key={builder} value={builder}>{builder}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Client Name */}
          <TextField fullWidth label="Client Name" name="clientname" value={formData.clientname} onChange={handleChange} required margin="normal" />

          {/* File Upload */}
          <input type="file" multiple onChange={handleFileChange} className="input-field" />

          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: "#eewf2ff", borderRadius: 1 }}>
              <Typography variant="h6">Selected Files:</Typography>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file}
                    <Button
                      onClick={() => handleRemoveFile(index)}
                      size="small"
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      ❌
                    </Button>
                  </li>
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
          <TextField fullWidth label="Project Start Date" name="projectstartdate" type="date" value={formData.projectstartdate} onChange={handleChange} required margin="normal" />

          {/* Completion Date */}
          <TextField fullWidth label="Completion Date" name="completiondate" type="date" value={formData.completiondate} onChange={handleChange} required margin="normal" />

          {/* Testimonials */}
          <TextField fullWidth label="Testimonials" name="testimonials" value={formData.testimonials} onChange={handleChange} margin="normal" />

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
       {/*  ToastContainer goes here */}
       <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}
