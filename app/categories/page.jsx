
'use client';
import { useEffect, useState } from 'react';
import DataManager from '../components/DataManager';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleAdd = async (name) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newCategory = await res.json();
    setCategories([...categories, newCategory]);
  };

  const handleEdit = async (index, newName) => {
    const category = categories[index];
    const res = await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: category._id, name: newName }),
    });
    const updated = await res.json();
    const updatedList = [...categories];
    updatedList[index] = updated;
    setCategories(updatedList);
  };

  const handleDelete = async (index) => {
    const category = categories[index];
    await fetch(`/api/categories?id=${category._id}`, { method: 'DELETE' });
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <DataManager
      title="Categories"
      items={categories.map((c) => c.name)}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
