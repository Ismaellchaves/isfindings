
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import { categorias } from '@/lib/dados';
import { Button } from '@/components/ui/button';
import { Produto } from '@/lib/tipos';
import { obterTodosProdutos, configurarVerificacaoAtualizacao } from '@/utils/exampleData';

const Categorias: React.FC = () => {
  const [generoAtivo, setGeneroAtivo] = useState<'feminino' | 'masculino'>('feminino');
  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProdutos = () => {
      setIsLoading(true);
      // Carrega todos os produtos ao montar o componente
      const produtos = obterTodosProdutos();
      setTodosProdutos(produtos);
      setIsLoading(false);
    };

    loadProdutos();
    
    // Event listener para atualizar produtos quando localStorage mudar
    const handleStorageChange = () => {
      console.log('Storage changed, reloading categories');
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

  // Filtra as categorias com base no gênero selecionado
  const categoriasFemininas = categorias.filter(cat => cat.genero === 'feminino');
  const categoriasMasculinas = categorias.filter(cat => cat.genero === 'masculino');
  const categoriasAtivas = generoAtivo === 'feminino' ? categoriasFemininas : categoriasMasculinas;

  // Filtra os produtos com base no gênero selecionado
  const produtosFiltrados = todosProdutos.filter(produto => {
    if (generoAtivo === 'feminino') {
      return produto.genero === 'feminino' || produto.genero === 'unissex';
    } else {
      return produto.genero === 'masculino' || produto.genero === 'unissex';
    }
  });

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title="Categorias" />
        
        <div className="flex gap-4 mb-6">
          <Button 
            variant={generoAtivo === 'feminino' ? 'default' : 'outline'}
            className="flex-1" 
            onClick={() => setGeneroAtivo('feminino')}
          >
            Feminino
          </Button>
          <Button 
            variant={generoAtivo === 'masculino' ? 'default' : 'outline'}
            className="flex-1" 
            onClick={() => setGeneroAtivo('masculino')}
          >
            Masculino
          </Button>
        </div>
        
        <h2 className="font-semibold text-lg mb-4">
          Categorias {generoAtivo === 'feminino' ? 'Femininas' : 'Masculinas'}
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Carregando categorias...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {categoriasAtivas.map((categoria) => (
                <Link
                  key={categoria.id}
                  to={`/categorias/${categoria.id}`}
                  className="flex flex-col items-center p-3 bg-white rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-2xl">{categoria.icone}</span>
                  </div>
                  <span className="text-xs text-center font-medium">{categoria.nome}</span>
                </Link>
              ))}
            </div>

            <h2 className="font-semibold text-lg mb-4 mt-8">
              Produtos {generoAtivo === 'feminino' ? 'Femininos' : 'Masculinos'}
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.slice(0, 6).map((produto) => (
                  <Link
                    key={produto.id}
                    to={`/detalhes/${produto.id}`}
                    className="flex flex-col items-center p-3 bg-white rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300"
                  >
                    <img src={produto.imagem} alt={produto.nome} className="w-16 h-16 object-contain mb-2" />
                    <span className="text-xs text-center font-medium truncate w-full">{produto.nome}</span>
                    <span className="text-xs text-gray-500">R$ {produto.preco.toFixed(2)}</span>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-4">
                  <p>Nenhum produto encontrado</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Categorias;
