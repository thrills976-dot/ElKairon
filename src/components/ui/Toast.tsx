import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-navy-900 border border-gold-500 shadow-2xl rounded-lg px-6 py-4 flex items-center gap-4 text-white min-w-[300px]"
        >
          <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500">
            <CheckCircle size={20} />
          </div>
          <p className="font-medium text-sm">{message}</p>
          <button 
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
