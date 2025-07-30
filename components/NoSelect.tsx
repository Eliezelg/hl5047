import React from 'react';

interface NoSelectProps {
  children: React.ReactNode;
}

export const NoSelect: React.FC<NoSelectProps> = ({ children }) => {
  return (
    <div
      className="select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};
