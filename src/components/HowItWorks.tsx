import React from 'react';
import { Upload, Cpu, MessageSquare, Bell } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Images',
    description: 'Start by uploading at least 4 high-quality images to train your model.'
  },
  {
    icon: Cpu,
    title: 'Train Model',
    description: 'Our AI processes your images and creates a custom model in about 20 minutes.'
  },
  {
    icon: MessageSquare,
    title: 'Generate Images',
    description: 'Use text prompts to generate unique images based on your trained model.'
  },
  {
    icon: Bell,
    title: 'Get Notified',
    description: 'Receive email notifications when your model is ready to use.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create your custom AI model in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent transform translate-x-1/2" />
              )}
              <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 relative z-10 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;