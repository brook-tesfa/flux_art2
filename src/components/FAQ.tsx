import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What types of AI image models can I train?',
    answer: 'You can train models for various subjects including people (portraits), products, pets, art styles, objects, fonts, and food. Our platform is versatile and supports multiple categories to meet your creative needs.'
  },
  {
    question: 'How long does it take to train a custom AI model?',
    answer: 'Training typically takes between 20-40 minutes, depending on the complexity of your subject and server load. You\'ll receive an email notification once your model is ready to use.'
  },
  {
    question: 'How many images do I need to train a custom model?',
    answer: 'You need a minimum of 4 high-quality images to train a model. For best results, we recommend uploading 5-10 images with good variety in poses, angles, and lighting while maintaining consistency in the subject.'
  },
  {
    question: 'How do I get the best results?',
    answer: 'For optimal results: 1) Use high-quality, well-lit images, 2) Ensure consistent subject focus across images, 3) Provide variety in poses/angles, 4) Use clear, detailed prompts when generating images, and 5) Experiment with different settings like guidance scale and inference steps.'
  },
  {
    question: 'Can I use the generated images commercially?',
    answer: 'Yes! All images generated using our platform are yours to use commercially. You retain full ownership and rights to the images you create, with no additional licensing fees or restrictions.'
  },
  {
    question: 'Do you offer support for using the platform?',
    answer: 'Yes, we provide comprehensive support through multiple channels. Free users get access to our documentation and community forums, while paid plans include email support. Enterprise plans feature priority support with dedicated response times.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">
            Everything you need to know about training and using custom AI models
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-medium text-left">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 py-4 bg-gray-800/25 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;