
import React from 'react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { produtos } from '@/lib/dados';

const Favoritos: React.FC = () => {
  // Simular alguns produtos favoritos
  const produtosFavoritos = produtos.slice(0, 4);
  
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <h1 className="title-text py-4 mb-4">Favoritos</h1>
        
        {produtosFavoritos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {produtosFavoritos.map((produto) => (
              <ProductCard 
                key={produto.id} 
                produto={produto} 
                favorito={true} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Sua lista de favoritos está vazia</h3>
            <p className="text-gray-500 max-w-xs">
              Explore nossos produtos e adicione itens à sua lista de favoritos para vê-los aqui
            </p>
          </div>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default Favoritos;
