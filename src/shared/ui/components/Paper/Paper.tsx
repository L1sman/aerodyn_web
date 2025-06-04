import React from 'react';
import styles from './Paper.module.scss';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Paper: React.FC<PaperProps> = ({ children, className, ...props }) => {
  return (
    <div className={`${styles.paper} ${className || ''}`} {...props}>
      {children}
    </div>
  );
}; 