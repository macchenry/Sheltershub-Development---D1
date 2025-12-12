
import React from 'react';

interface AdvertSpaceProps {
  className?: string;
  text?: string;
}

const AdvertSpace: React.FC<AdvertSpaceProps> = ({ className = '', text = 'Advert Space by Google' }) => {
  return (
    <div className={`bg-gray-300 flex items-center justify-center rounded-lg ${className}`}>
      <span className="text-gray-600 font-semibold text-lg text-center">{text}</span>
    </div>
  );
};

export default AdvertSpace;
