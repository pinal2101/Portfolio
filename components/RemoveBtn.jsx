
// "use client";

// import { IconButton, Tooltip } from "@mui/material";
// import { Delete as DeleteIcon } from "@mui/icons-material";

// const RemoveBtn = ({ id, onDeleteSuccess }) => {
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this item?")) return;

//     try {
//       const res = await fetch(`/api/topics?id=${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete the topic");

//       if (onDeleteSuccess) onDeleteSuccess(id); // ✅ Ensure function exists before calling
//     } catch (error) {
//       console.error("Error deleting topic:", error);
//     }
//   };

//   return (
//     <Tooltip title="Delete">
//       <IconButton color="error" onClick={handleDelete}>
//         <DeleteIcon />
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default RemoveBtn;

"use client";

import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const RemoveBtn = ({ id, handleDeleteSuccess }) => {
  const onDelete = async () => {
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete topic");
      handleDeleteSuccess(id);
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <IconButton onClick={onDelete} color="error">
      <DeleteIcon />
    </IconButton>
  );
};
