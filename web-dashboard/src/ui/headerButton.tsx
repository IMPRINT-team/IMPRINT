// src/components/HeaderButton.tsx
import React from 'react';
import { headerButtonStyles } from '../ui/panelVariants'; // <--- UPDATED PATH

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ children, className, ...props }) => {
  return (
    <button 
      className={`${headerButtonStyles} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default HeaderButton;