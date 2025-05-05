// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Pencil, Trash2 } from "lucide-react";

// const DataManager = ({ title, items, onAdd, onEdit, onDelete }) => {
//   const [newItem, setNewItem] = useState("");
//   const [editIndex, setEditIndex] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   return (
//     <div className="p-4 w-full">
//       <h2 className="text-2xl font-semibold mb-4">{title} Management</h2>

//       <div className="flex gap-2 mb-4">
//         <Input
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder={`Add new ${title.toLowerCase()}`}
//         />
//         <Button onClick={() => {
//           onAdd(newItem);
//           setNewItem("");
//         }}>Add</Button>
//       </div>

//       <Card>
//         <CardContent className="p-2">
//           {items.length === 0 ? (
//             <p className="text-gray-500">No {title.toLowerCase()} found.</p>
//           ) : (
//             <ul className="space-y-2">
//               {items.map((item, index) => (
//                 <li key={index} className="flex items-center justify-between">
//                   {editIndex === index ? (
//                     <div className="flex items-center gap-2">
//                       <Input
//                         value={editValue}
//                         onChange={(e) => setEditValue(e.target.value)}
//                       />
//                       <Button
//                         size="sm"
//                         onClick={() => {
//                           onEdit(index, editValue);
//                           setEditIndex(null);
//                           setEditValue("");
//                         }}
//                       >Save</Button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <span>{item}</span>
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         onClick={() => {
//                           setEditIndex(index);
//                           setEditValue(item);
//                         }}
//                       >
//                         <Pencil className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         onClick={() => onDelete(index)}
//                       >
//                         <Trash2 className="w-4 h-4 text-red-500" />
//                       </Button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DataManager;



'use client';
import { useState } from 'react';

export default function DataManager({ title, items, onAdd, onEdit, onDelete }) {
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title} Manager</h2>

      {/* Add New Item */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder={`Add new ${title.toLowerCase()}`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (newItem.trim()) {
              onAdd(newItem.trim());
              setNewItem('');
            }
          }}
        >
          Add
        </button>
      </div>

      {/* List of Items */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between border p-2 rounded">
            {editIndex === index ? (
              <>
                <input
                  className="border p-1 rounded w-full mr-2"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    onEdit(index, editValue);
                    setEditIndex(null);
                    setEditValue('');
                  }}
                >
                  Save
                </button>
                <button
                  className="text-gray-500"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{item}</span>
                <div className="space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setEditIndex(index);
                      setEditValue(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
