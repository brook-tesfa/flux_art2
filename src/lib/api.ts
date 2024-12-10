import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.fluxai.com';

export interface TrainingResponse {
  id: string;
  status: 'queued' | 'training' | 'completed' | 'failed';
  progress: number;
  modelId?: string;
  error?: string;
}

export interface GenerationResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  imageUrl?: string;
  error?: string;
}

export interface GenerationParams {
  prompt: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
}

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const { url } = await response.json();
    urls.push(url);
  }

  return urls;
};

export const startTraining = async (imageUrls: string[]): Promise<string> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const response = await fetch(`${API_URL}/train`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images: imageUrls }),
  });

  if (!response.ok) {
    throw new Error('Failed to start training');
  }

  const { trainingId } = await response.json();
  return trainingId;
};

export const getTrainingStatus = async (trainingId: string): Promise<TrainingResponse> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const response = await fetch(`${API_URL}/training/${trainingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get training status');
  }

  return response.json();
};

export const generateImage = async (modelId: string, params: GenerationParams): Promise<string> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const response = await fetch(`${API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      modelId,
      ...params,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to start image generation');
  }

  const { generationId } = await response.json();
  return generationId;
};

export const getGenerationStatus = async (generationId: string): Promise<GenerationResponse> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const response = await fetch(`${API_URL}/generation/${generationId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get generation status');
  }

  return response.json();
};