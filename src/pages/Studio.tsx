import React from 'react';
import { Navigate } from 'react-router-dom';
import { ImageGeneration } from '../components/ImageGeneration';
import { useTrainingStore } from '../store/trainingStore';

export const Studio = () => {
  const { status, modelId } = useTrainingStore();

  if (!modelId || status !== 'completed') {
    return <Navigate to="/train" />;
  }

  return (
    <div className="container mx-auto pt-24">
      <ImageGeneration />
    </div>
  );
};