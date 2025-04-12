import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import ProductCard from '@/components/ProductCard';
import { Produto } from '@/lib/tipos';
import { obterTodosProdutos, configurarVerificacaoAtualizacao } from '@/utils/exampleData';

const Detalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantidade, setQuantidade] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [produtosSimilares, setProdutosSimilares] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProdutoData = () => {
      setIsLoading(true);
      
      // Obter todos os produtos
      const todosProdutos = obterTodosProdutos();
      
      // Encontrar o produto pelos parâmetros da URL
      const produtoEncontrado = todosProdutos.find(p => p.id === id);
      
      if (produtoEncontrado) {
        setProduto(produtoEncontrado);
        
        // Produtos similares (mesma categoria, excluindo o atual)
        const similares = todosProdutos
          .filter(p => p.id !== id && p.categoria === produtoEncontrado.categoria)
          .slice(0, 2);
        
        setProdutosSimilares(similares);
      }
      
      setIsLoading(false);
    };

    loadProdutoData();
    
    // Event listener para atualizar produto quando localStorage mudar
    const handleStorageChange = () => {
      console.log('Storage changed, reloading product details');
      loadProdutoData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Configurar verificação de atualizações em outros dispositivos
    const cleanupVerificacao = configurarVerificacaoAtualizacao(loadProdutoData);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      cleanupVerificacao();
    };
  }, [id]);
  
  if (isLoading) {
    return (
      <>
        <StatusBar />
        <div className="page-container flex items-center justify-center">
          <p>Carregando produto...</p>
        </div>
      </>
    );
  }
  
  if (!produto) {
    return (
      <>
        <StatusBar />
        <div className="page-container flex items-center justify-center">
          <p>Produto não encontrado.</p>
        </div>
      </>
    );
  }
  
  const handleAddToCart = () => {
    // Redireciona para o link do produto
    window.open(produto.link, '_blank'); // Abre o link em uma nova aba
  };
  
  const incrementarQuantidade = () => {
    setQuantidade(prev => prev + 1);
  };
  
  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };
  
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack 
          title="Detalhes do Produto" 
          showFavorite={true}
          favorite={favorito}
          onFavoriteToggle={() => setFavorito(!favorito)}
        />
        
        <div className="mb-6">
          <div className="relative h-64 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              className="h-full object-contain"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{produto.nome}</h1>
          
          <div className="flex items-baseline mb-4">
            <span className="text-xl text-orange-500 font-bold">R${produto.preco}</span>
            {produto.precoAntigo && (
              <span className="ml-2 text-gray-500 line-through text-sm">R${produto.precoAntigo}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={decrementarQuantidade}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              disabled={quantidade <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="text-lg font-medium">{quantidade}</span>
            
            <button 
              onClick={incrementarQuantidade}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-lg font-semibold mb-2">Experiência</h2>
          <p className="text-gray-600 text-sm mb-6">
            {produto.descricao}
            <span className="text-orange-500 font-medium ml-1">Mais</span>
          </p>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition-colors"
          >
            Comprar
          </button>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="title-text">Produtos Similares</h2>
            <button className="text-sm text-orange-500 flex items-center">
              Ver mais
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {produtosSimilares.map((produto) => (
              <ProductCard 
                key={produto.id} 
                produto={produto} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalhes;
