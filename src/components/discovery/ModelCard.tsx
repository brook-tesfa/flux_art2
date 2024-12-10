import React from 'react';
import { Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Model } from '../../types/model';

interface ModelCardProps {
  model: Model;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={model.previewImage}
          alt={model.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-semibold mb-1">{model.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <User className="w-4 h-4" />
            <span>{model.creator}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{model.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-400">{model.usageCount} uses</span>
        </div>
        
        <Link
          to={`/studio/${model.id}`}
          className="block w-full py-2 text-center bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
        >
          Try Model
        </Link>
      </div>
    </motion.div>
  );
};