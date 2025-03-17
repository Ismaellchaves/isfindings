
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Produto } from '@/lib/tipos';

interface ProductCardProps {
  produto: Produto;
  favorito?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto, favorito = false }) => {
  const [isFavorite, setIsFavorite] = useState(favorito);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/detalhes/${produto.id}`} className="block">
      <div className="relative rounded-xl overflow-hidden bg-white shadow-subtle transition-all duration-300 hover:shadow-elevated">
        <div className="relative h-40 bg-gray-100">
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{produto.nome}</h3>
          <div className="flex items-center mt-1">
            <span className="price-text">R${produto.preco}</span>
            {produto.precoAntigo && (
              <span className="old-price">R${produto.precoAntigo}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
