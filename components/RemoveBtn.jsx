"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const RemoveBtn = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete topic");
      }

      onDeleteSuccess(id);  // Correctly updates UI
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert(error.message); //  Shows error to user
    }
  };

  return (
    <Tooltip title="Delete">
      <IconButton color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveBtn;


