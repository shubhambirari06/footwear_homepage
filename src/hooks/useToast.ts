import { useState, useCallback } from 'react';
import { Toast } from '../types/index';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 3000) => {
      const id = Date.now().toString();
      const toast: Toast = { id, type, message, duration };

      setToasts(prev => [...prev, toast]);

      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};
