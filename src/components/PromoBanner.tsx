
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoBanner: React.FC = () => {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">Ganhe sua oferta especial</h3>
          <p className="text-sm text-gray-300 mb-3">até 40% de desconto</p>
          
          <Link 
            to="/categorias" 
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            Compre Agora
          </Link>
        </div>
        
        <div className="w-24 relative">
          <img 
            src="/isfindings.jpg" 
            alt="Produto em destaque" 
            className="absolute bottom-0 right-0 h-32 object-contain transform -rotate-12"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
