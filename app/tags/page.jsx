  'use client';
import { useState, useEffect } from 'react';
import DataManager from '../components/DataManager';

const  TagsPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/api/tags')
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  const handleAdd = async (newTagName) => {
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTagName }),
    });
    const newTag = await res.json();
    setTags([...tags, newTag]);
  };

  const handleEdit = async (index, newName) => {
    const tag = tags[index];
    const res = await fetch('/api/tags', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tag._id, name: newName }),
    });
    const updatedTag = await res.json();
    const updatedTags = [...tags];
    updatedTags[index] = updatedTag;
    setTags(updatedTags);
  };

  const handleDelete = async (index) => {
    const tag = tags[index];
    await fetch(`/api/tags?id=${tag._id}`, {
      method: 'DELETE',
    });
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <DataManager
      title="Tags"
      items={tags.map((t) => t.name)}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
export default TagsPage;