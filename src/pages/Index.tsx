import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import PromoBanner from '@/components/PromoBanner';
import CategoryList from '@/components/CategoryList';
import ProductCard from '@/components/ProductCard';
import { produtos } from '@/lib/dados';

const Index: React.FC = () => {
  const [showAll, setShowAll] = useState(false); // Estado para controlar a visualização
  const limit = 4; // Limite inicial de produtos exibidos

  // Decide quantos produtos mostrar com base no estado `showAll`
  const displayProducts = showAll ? produtos : produtos.slice(0, limit);

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <SearchBar count={3} />
        <PromoBanner />
        <CategoryList limit={5} />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="title-text">Itens Populares</h2>
            <button
              onClick={() => setShowAll(!showAll)} // Alterna entre mostrar tudo ou limitar
              className="text-sm text-orange-500 flex items-center cursor-pointer"
            >
              {showAll ? "Ver menos" : "Ver mais"}
              <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {displayProducts.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                favorito={produto.id === '1'}
              />
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Index;