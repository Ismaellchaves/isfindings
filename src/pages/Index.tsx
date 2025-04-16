
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
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

  // Função para carregar produtos
  const loadProdutos = () => {
    setIsLoading(true);
    try {
      const todosProdutos = obterTodosProdutos();
      // Ordenar produtos por data de publicação (mais recentes primeiro)
      const sortedProdutos = todosProdutos.sort((a, b) => {
        const dateA = a.data_publicacao ? new Date(a.data_publicacao).getTime() : 0;
        const dateB = b.data_publicacao ? new Date(b.data_publicacao).getTime() : 0;
        return dateB - dateA;
      });
      setProdutos(sortedProdutos);
      
      // Notificação para novos produtos (apenas em atualizações, não no carregamento inicial)
      if (!isLoading && sortedProdutos.length > produtos.length) {
        toast({
          title: "Novos produtos disponíveis",
          description: "Novos produtos foram adicionados à loja.",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Carregar produtos inicialmente
    loadProdutos();

    // Event listener para atualizar produtos quando localStorage mudar
    const handleStorageChange = () => {
      console.log('Storage changed, reloading products on home page');
      loadProdutos();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Configurar verificação de atualizações em outros dispositivos
    const cleanupVerificacao = configurarVerificacaoAtualizacao(loadProdutos);
    
    // Atualizar a cada 30 segundos para garantir que novos produtos sejam exibidos
    const intervalId = setInterval(loadProdutos, 30000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      cleanupVerificacao();
      clearInterval(intervalId);
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
              onClick={() => setShowAll(!showAll)} 
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
            <>
              {produtos.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {displayProducts.map((produto) => (
                    <ProductCard
                      key={produto.id}
                      produto={produto}
                      favorito={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-8">
                  <p>Nenhum produto disponível no momento.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Index;
