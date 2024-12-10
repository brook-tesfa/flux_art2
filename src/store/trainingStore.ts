import { create } from 'zustand';
import { uploadImages, startTraining, getTrainingStatus, TrainingResponse } from '../lib/api';

interface TrainingState {
  status: TrainingResponse['status'] | 'uploading' | 'idle';
  progress: number;
  error: string | null;
  modelId: string | null;
  trainingId: string | null;
  startModelTraining: (files: File[]) => Promise<void>;
  checkStatus: () => Promise<void>;
  reset: () => void;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  status: 'idle',
  progress: 0,
  error: null,
  modelId: null,
  trainingId: null,

  startModelTraining: async (files: File[]) => {
    try {
      set({ status: 'uploading', progress: 0, error: null });
      
      // Upload images
      const imageUrls = await uploadImages(files);
      set({ progress: 20 });

      // Start training
      const trainingId = await startTraining(imageUrls);
      set({ trainingId, status: 'queued', progress: 30 });

      // Start polling for status
      const pollStatus = async () => {
        const { trainingId: currentId, status } = get();
        
        if (!currentId || ['completed', 'failed'].includes(status)) {
          return;
        }

        try {
          const response = await getTrainingStatus(currentId);
          set({
            status: response.status,
            progress: response.status === 'completed' ? 100 : Math.min(90, get().progress + 10),
            modelId: response.modelId,
            error: response.error || null,
          });

          if (!['completed', 'failed'].includes(response.status)) {
            setTimeout(pollStatus, 5000);
          }
        } catch (error) {
          set({ error: 'Failed to get training status', status: 'failed' });
        }
      };

      setTimeout(pollStatus, 5000);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to start training',
        status: 'failed'
      });
    }
  },

  checkStatus: async () => {
    const { trainingId } = get();
    if (!trainingId) return;

    try {
      const response = await getTrainingStatus(trainingId);
      set({
        status: response.status,
        progress: response.status === 'completed' ? 100 : get().progress,
        modelId: response.modelId,
        error: response.error || null,
      });
    } catch (error) {
      set({ error: 'Failed to get training status' });
    }
  },

  reset: () => {
    set({
      status: 'idle',
      progress: 0,
      error: null,
      modelId: null,
      trainingId: null,
    });
  },
}));