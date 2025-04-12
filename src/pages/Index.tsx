
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import PromoBanner from '@/components/PromoBanner';
import CategoryList from '@/components/CategoryList';
import ProductCard from '@/components/ProductCard';
import { Produto } from '@/lib/tipos';
import { obterTodosProdutos, configurarVerificacaoAtualizacao } from '@/utils/exampleData';

const Index: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 4; // Limite inicial de produtos exibidos

  useEffect(() => {
    // Carregar todos os produtos (localStorage + dados.ts)
    const loadProdutos = () => {
      setIsLoading(true);
      const todosProdutos = obterTodosProdutos();
      setProdutos(todosProdutos);
      setIsLoading(false);
    };

    loadProdutos();

    // Event listener para atualizar produtos quando localStorage mudar
    const handleStorageChange = () => {
      console.log('Storage changed, reloading products');
      loadProdutos();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Configurar verificação de atualizações em outros dispositivos
    const cleanupVerificacao = configurarVerificacaoAtualizacao(loadProdutos);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      cleanupVerificacao();
    };
  }, []);

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

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <p>Carregando produtos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {displayProducts.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  favorito={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Index;
