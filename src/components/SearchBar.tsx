
import React, { useState } from 'react';
import { Search, Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { produtos } from '@/lib/dados';
import { useToast } from '@/hooks/use-toast';

interface SearchBarProps {
  count?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ count = 3 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  // Filtrar produtos com base no termo de pesquisa
  const filteredProducts = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };
  
  const handleShowNotifications = () => {
    toast({
      title: "Novas promoções disponíveis!",
      description: "Aproveite descontos de até 50% em produtos selecionados",
      variant: "default",
    });
  };
  
  return (
    <div className="relative">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-9 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button 
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={clearSearch}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        
        <button onClick={handleShowNotifications} className="relative">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-600" />
          </div>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
      
      {/* Resultados da pesquisa */}
      {showResults && (
        <div className="absolute top-16 left-0 right-0 z-10 bg-white rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="p-3 space-y-3">
              {filteredProducts.map((produto) => (
                <Link 
                  key={produto.id}
                  to={`/detalhes/${produto.id}`}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
                  onClick={clearSearch}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3">
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-1">{produto.nome}</h4>
                    <span className="text-orange-500 text-xs">R${produto.preco}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
