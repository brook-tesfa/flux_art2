import React, { useState } from 'react';
import { Loader2, Download, RefreshCw, Sliders } from 'lucide-react';
import { useGenerationStore } from '../store/generationStore';
import { useTrainingStore } from '../store/trainingStore';
import type { GenerationParams } from '../lib/api';

export const ImageGeneration = () => {
  const { modelId } = useTrainingStore();
  const { status, currentImage, error, generateImage } = useGenerationStore();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [params, setParams] = useState<GenerationParams>({
    prompt: '',
    negativePrompt: '',
    numInferenceSteps: 30,
    guidanceScale: 7.5,
    seed: -1,
  });

  const handleGenerate = async () => {
    if (!modelId || !params.prompt) return;
    await generateImage(modelId, params);
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `generation-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Generate Images</h2>
            <textarea
              value={params.prompt}
              onChange={(e) => setParams({ ...params, prompt: e.target.value })}
              placeholder="Enter your prompt here..."
              className="w-full h-32 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Sliders className="w-4 h-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Negative Prompt
                  </label>
                  <input
                    type="text"
                    value={params.negativePrompt}
                    onChange={(e) => setParams({ ...params, negativePrompt: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Inference Steps ({params.numInferenceSteps})
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={params.numInferenceSteps}
                    onChange={(e) => setParams({ ...params, numInferenceSteps: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Guidance Scale ({params.guidanceScale})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={params.guidanceScale}
                    onChange={(e) => setParams({ ...params, guidanceScale: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Seed (use -1 for random)
                  </label>
                  <input
                    type="number"
                    value={params.seed}
                    onChange={(e) => setParams({ ...params, seed: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!modelId || !params.prompt || status === 'generating'}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2
              ${!modelId || !params.prompt || status === 'generating'
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {status === 'generating' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Right Panel - Image Display */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="aspect-square rounded-lg overflow-hidden relative">
            {currentImage ? (
              <>
                <img
                  src={currentImage}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={status === 'generating'}
                    className="p-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-5 h-5 ${status === 'generating' ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Generated image will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};