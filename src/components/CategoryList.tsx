
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categorias } from '@/lib/dados';

interface CategoryListProps {
  limit?: number;
  showMore?: boolean;
  genero?: 'feminino' | 'masculino' | 'unissex';
  title?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  limit = 5, 
  showMore = true, 
  genero, 
  title = "Categorias" 
}) => {
  const filteredCategories = genero 
    ? categorias.filter(cat => cat.genero === genero) 
    : categorias;
  
  const displayCategories = filteredCategories.slice(0, limit);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="title-text">{title}</h2>
        {showMore && (
          <Link to="/categorias" className="text-sm text-orange-500 flex items-center">
            Ver mais
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="flex overflow-x-auto pb-2 space-x-4 -mx-4 px-4 scrollbar-hide">
        {displayCategories.map((categoria) => (
          <Link
            key={categoria.id}
            to={`/categorias/${categoria.id}`}
            className="flex flex-col items-center space-y-2 min-w-[60px]"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <span className="text-2xl">{categoria.icone}</span>
            </div>
            <span className="text-xs text-center font-medium">{categoria.nome}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
