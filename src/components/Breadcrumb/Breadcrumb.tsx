import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-600 bg-neutral-50 border-b border-neutral-200">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-neutral-400" />}
          <motion.button
            whileHover={{ color: '#b45309' }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            className={
              item.href || item.onClick
                ? 'cursor-pointer hover:text-amber-700 transition-colors'
                : 'text-neutral-900 font-medium'
            }
            disabled={!item.href && !item.onClick}
          >
            {item.label}
          </motion.button>
        </React.Fragment>
      ))}
    </nav>
  );
};
