import React, { useEffect } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';

export const TrainingProgress = () => {
  const { status, progress, error } = useTrainingStore();

  const getStatusDisplay = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading images...';
      case 'queued':
        return 'Waiting in queue...';
      case 'training':
        return 'Training in progress...';
      case 'completed':
        return 'Training completed!';
      case 'failed':
        return 'Training failed';
      default:
        return '';
    }
  };

  return status !== 'idle' ? (
    <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">{getStatusDisplay()}</span>
        {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
        {status === 'failed' && <XCircle className="w-6 h-6 text-red-500" />}
        {['uploading', 'queued', 'training'].includes(status) && (
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
        )}
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}

      {status === 'completed' && (
        <p className="text-green-400 text-sm mt-2">
          Your model is ready! You can now start generating images.
        </p>
      )}
    </div>
  ) : null;
};