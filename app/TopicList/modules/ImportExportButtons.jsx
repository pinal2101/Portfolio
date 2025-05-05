
"use client";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportExportButtons = () => {
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]); 
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("files added successfully!");
        setUploadedFiles(result.urls); 
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error("File upload error:", err);
       toast.error("Error loading files!");
    }
  };

  const handleExport = () => {
    if (uploadedFiles.length === 0) {
      toast.error("No files to download!");
      return;
    }

    uploadedFiles.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = ""; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-4">
        <button
          onClick={handleImport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Import File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".json,.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
          className="hidden"
        />
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download File
        </button>
      </div>

      
      {uploadedFiles.length > 0 && (
        <ul className="text-sm text-gray-700 list-disc pl-5">
          {uploadedFiles.map((url, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {url.split("/").pop()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}  
export default ImportExportButtons

// "use client";
// import { useRef, useState } from "react";
// import * as XLSX from "xlsx";

// export function ImportExportButtons() {
//   const fileInputRef = useRef(null);
//   const [importedFile, setImportedFile] = useState(null);
//   const [columns, setColumns] = useState([]);
//   const [tableData, setTableData] = useState([]);

//   // Handle import button click
//   const handleImport = () => {
//     fileInputRef.current?.click();
//   };

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setImportedFile(file);

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       const headers = jsonData[0];
//       const rows = jsonData.slice(1);

//       setColumns(headers);
//       setTableData(rows);

//       // Open the imported file in Excel (or download it)
//       const excelBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       const excelUrl = URL.createObjectURL(excelBlob);
//       window.open(excelUrl, "_blank"); // Opens the file in Excel
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Handle file export (Download file)
//   const handleExport = () => {
//     if (!importedFile) {
//       alert("No file to download.");
//       return;
//     }

//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(importedFile);
//     link.download = importedFile.name;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="flex flex-col gap-6 items-start w-full">
//       <div className="flex gap-4">
//         <button
//           onClick={handleImport}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Import File
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept=".xlsx,.xls,.json,.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
//           className="hidden"
//         />
//         <button
//           onClick={handleExport}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Download File
//         </button>
//       </div>

//       {/* Display the imported data as a table */}
//       {tableData.length > 0 && (
//         <div className="overflow-auto w-full border rounded">
//           <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
//             <thead className="bg-gray-200">
//               <tr>
//                 {columns.map((col, index) => (
//                   <th key={index} className="px-4 py-2 border">
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, rowIndex) => (
//                 <tr key={rowIndex} className="even:bg-gray-50">
//                   {row.map((cell, colIndex) => (
//                     <td key={colIndex} className="px-4 py-2 border">
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
