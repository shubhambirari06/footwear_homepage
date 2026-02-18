import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Toast } from '../../types/index';

interface ToastManagerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onRemove }) => {
  const getToastColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="shrink-0" />;
      case 'error':
        return <AlertCircle size={20} className="shrink-0" />;
      case 'warning':
        return <AlertCircle size={20} className="shrink-0" />;
      case 'info':
      default:
        return <Info size={20} className="shrink-0" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, x: 400 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 400 }}
            className={`flex items-start gap-3 p-4 rounded-lg shadow-lg text-white pointer-events-auto ${getToastColor(toast.type)}`}
          >
            {getToastIcon(toast.type)}

            <div className="flex-1">
              <p className="font-medium text-sm">{toast.message}</p>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
