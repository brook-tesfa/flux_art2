import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';

export const TrainingPending = () => {
  const navigate = useNavigate();
  const { status, progress } = useTrainingStore();

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading your images...';
      case 'queued':
        return 'Preparing your model for training...';
      case 'training':
        return 'Training your custom AI model...';
      case 'completed':
        return 'Training completed successfully!';
      default:
        return 'Initializing...';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          <button
            onClick={() => navigate('/train')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </button>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gray-700" />
              <div
                className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"
                style={{ animationDuration: '2s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{getStatusMessage()}</h2>
            <p className="text-gray-400 mb-8">
              This process typically takes about 20-30 minutes. We'll notify you once it's ready.
            </p>

            <div className="w-full bg-gray-700/50 rounded-full h-2 mb-4">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{progress}% Complete</p>

            <div className="mt-12 space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">What's happening?</h3>
                <p className="text-sm text-gray-400">
                  Our AI is analyzing your images and learning the unique characteristics of your subject.
                  This deep learning process ensures high-quality results.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-medium mb-2">What's next?</h3>
                <p className="text-sm text-gray-400">
                  Once training is complete, you'll be able to generate unlimited variations of your
                  subject using text prompts in our AI Studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};