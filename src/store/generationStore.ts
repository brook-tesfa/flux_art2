import { create } from 'zustand';
import { generateImage, getGenerationStatus, GenerationParams } from '../lib/api';

interface GenerationState {
  status: 'idle' | 'generating' | 'completed' | 'failed';
  currentImage: string | null;
  error: string | null;
  history: string[];
  generateImage: (modelId: string, params: GenerationParams) => Promise<void>;
  reset: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  status: 'idle',
  currentImage: null,
  error: null,
  history: [],

  generateImage: async (modelId: string, params: GenerationParams) => {
    try {
      set({ status: 'generating', error: null });

      const generationId = await generateImage(modelId, params);

      const pollStatus = async () => {
        try {
          const response = await getGenerationStatus(generationId);

          if (response.status === 'completed' && response.imageUrl) {
            set(state => ({
              status: 'completed',
              currentImage: response.imageUrl,
              history: [...state.history, response.imageUrl],
            }));
          } else if (response.status === 'failed') {
            set({
              status: 'failed',
              error: response.error || 'Generation failed',
            });
          } else {
            setTimeout(pollStatus, 1000);
          }
        } catch (error) {
          set({
            status: 'failed',
            error: 'Failed to check generation status',
          });
        }
      };

      setTimeout(pollStatus, 1000);
    } catch (error) {
      set({
        status: 'failed',
        error: error instanceof Error ? error.message : 'Failed to generate image',
      });
    }
  },

  reset: () => {
    set({
      status: 'idle',
      currentImage: null,
      error: null,
    });
  },
}));