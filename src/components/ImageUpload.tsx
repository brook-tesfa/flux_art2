import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTrainingStore } from '../store/trainingStore';
import { useNavigate } from 'react-router-dom';

interface PreviewImage {
  file: File;
  preview: string;
}

export const ImageUpload = () => {
  const [images, setImages] = React.useState<PreviewImage[]>([]);
  const { user } = useAuthStore();
  const { status, startModelTraining } = useTrainingStore();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages(prev => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, 4);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5242880,
    maxFiles: 4,
    disabled: status !== 'idle'
  });

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleTraining = async () => {
    if (images.length < 4) {
      alert('Please upload 4 images to begin training');
      return;
    }

    if (!user) {
      localStorage.setItem('redirectTo', '/train');
      navigate('/login');
      return;
    }

    await startModelTraining(images.map(img => img.file));
    navigate('/training-pending');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Train Your Custom AI Model</h2>
        <p className="text-gray-400">
          Upload 4 high-quality images of your subject to create a custom AI model.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500'}
          ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-purple-500" />
        <p className="text-lg mb-2">
          {isDragActive ? 'Drop your images here' : 'Drag & drop images here'}
        </p>
        <p className="text-sm text-gray-400">
          or click to select files (max 4 images, 5MB each)
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Selected Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={status !== 'idle'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {Array.from({ length: 4 - images.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="border-2 border-dashed border-gray-700 rounded-lg h-40 flex items-center justify-center"
              >
                <ImageIcon className="w-8 h-8 text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleTraining}
        disabled={images.length < 4 || status !== 'idle'}
        className={`mt-8 w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2
          ${images.length < 4 || status !== 'idle'
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'}`}
      >
        Start Training
      </button>

      {!user && (
        <p className="mt-4 text-center text-gray-400">
          Please sign in to start training your model
        </p>
      )}
    </div>
  );
};