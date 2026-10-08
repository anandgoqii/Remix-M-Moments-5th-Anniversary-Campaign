import React from 'react';

interface MPlusLogoProps {
  className?: string;
}

export const MPlusLogo: React.FC<MPlusLogoProps> = ({ className = 'h-7 w-auto' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 330.58 161.81"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="M+ Logo"
    >
      <path d="M322.52,85.3v-31h-44.8V9.5h-31v44.8h-44.8v31h120.6ZM135.92,152.3h33V9.5h-49.5s-30.93,89.18-30.93,89.18L57.56,9.5H8.06s0,142.8,0,142.8h33V54.31l32.99,97.98h0s28.88,0,28.88,0h0s32.99-97.99,32.99-97.99v97.99h0ZM277.72,89.43l-31,17.9v22.78h31v-40.68h0Z" />
    </svg>
  );
};
