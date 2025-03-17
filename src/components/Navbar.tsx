
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-10">
      <Link to="/" className="flex flex-col items-center">
        <Home className={`nav-icon ${isActive('/') ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className={`text-xs ${isActive('/') ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Início</span>
      </Link>
      
      <Link to="/favoritos" className="flex flex-col items-center">
        <Heart className={`nav-icon ${isActive('/favoritos') ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className={`text-xs ${isActive('/favoritos') ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Favoritos</span>
      </Link>
      
      <Link to="/carrinho" className="flex flex-col items-center">
        <ShoppingCart className={`nav-icon ${isActive('/carrinho') ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className={`text-xs ${isActive('/carrinho') ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Carrinho</span>
      </Link>
      
      <Link to="/perfil" className="flex flex-col items-center">
        <User className={`nav-icon ${isActive('/perfil') ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className={`text-xs ${isActive('/perfil') ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Perfil</span>
      </Link>
    </div>
  );
};

export default Navbar;
