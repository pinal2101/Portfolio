"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/topics`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.topics || []); // Ensure topics is an array
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id)); // Fix `_id`
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Project Name</th>
            <th className="border border-gray-300 px-4 py-2">Website Link</th>
            <th className="border border-gray-300 px-4 py-2">Technology</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Page Builder</th>
            <th className="border border-gray-300 px-4 py-2">Client Name</th>
            <th className="border border-gray-300 px-4 py-2">Client Invoices</th>
            <th className="border border-gray-300 px-4 py-2">Bid Platform</th>
            <th className="border border-gray-300 px-4 py-2">Bid Platform URL</th>
            <th className="border border-gray-300 px-4 py-2">Invoice Amount</th>
            <th className="border border-gray-300 px-4 py-2">Project Start Date</th>
            <th className="border border-gray-300 px-4 py-2">Completion Date</th>
            <th className="border border-gray-300 px-4 py-2">Testimonials</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{product.projectname}</td>
                <td className="border border-gray-300 px-4 py-2">{product.websitelink}</td>
                <td className="border border-gray-300 px-4 py-2">{product.technology}</td>
                <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2">{product.pagebuilder}</td>
                <td className="border border-gray-300 px-4 py-2">{product.clientname}</td>
                <td className="border border-gray-300 px-4 py-2">{product.clientinvoices?.join(", ")}</td>
                <td className="border border-gray-300 px-4 py-2">{product.bidplatform}</td>
                <td className="border border-gray-300 px-4 py-2">{product.bidplatformURL}</td>
                <td className="border border-gray-300 px-4 py-2">${product.invoiceamount}</td>
                <td className="border border-gray-300 px-4 py-2">{product.projectstartdate}</td>
                <td className="border border-gray-300 px-4 py-2">{product.completiondate}</td>
                <td className="border border-gray-300 px-4 py-2">{product.testimonials}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => router.push(`/edit/${product._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="text-center py-4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
