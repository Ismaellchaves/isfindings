
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';

interface HeaderBackProps {
  title: string;
  showFavorite?: boolean;
  favorite?: boolean;
  onFavoriteToggle?: () => void;
}

const HeaderBack: React.FC<HeaderBackProps> = ({ 
  title, 
  showFavorite = false, 
  favorite = false,
  onFavoriteToggle
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="flex items-center justify-between py-4 mb-4">
      <button 
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h1 className="title-text">{title}</h1>
      
      {showFavorite ? (
        <button 
          onClick={onFavoriteToggle}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
        >
          <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}
    </div>
  );
};

export default HeaderBack;
