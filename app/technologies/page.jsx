'use client';
import { useState } from 'react';
import DataManager from '../components/DataManager';

const  TechnologiesPage = () => {
  const [technologies, setTechnologies] = useState(['Next.js', 'Firebase', 'Tailwind']);

  return (
    <DataManager
      title="Technologies"
      items={technologies}
      onAdd={(newItem) => setTechnologies([...technologies, newItem])}
      onEdit={(index, newValue) => {
        const updated = [...technologies];
        updated[index] = newValue;
        setTechnologies(updated);
      }}
      onDelete={(index) => {
        const updated = technologies.filter((_, i) => i !== index);
        setTechnologies(updated);
      }}
    />
  );
}
export default TechnologiesPage;