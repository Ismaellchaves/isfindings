
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import ProductCard from '@/components/ProductCard';
import { categorias } from '@/lib/dados';
import { Produto } from '@/lib/tipos';
import { obterTodosProdutos } from '@/utils/exampleData';

const CategoriaDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoriaData = () => {
      setIsLoading(true);
      // Encontra a categoria com base no ID
      const categoriaEncontrada = categorias.find(cat => cat.id === id);

      if (categoriaEncontrada) {
        setCategoria(categoriaEncontrada.nome);

        // Obter todos os produtos
        const todosProdutos = obterTodosProdutos();

        // Filtra produtos pela categoria
        const produtosDaCategoria = todosProdutos.filter(produto => 
          produto.categoria.toLowerCase() === categoriaEncontrada.id.split('-')[0].toLowerCase()
        );

        setProdutosFiltrados(produtosDaCategoria);
      }
      setIsLoading(false);
    };

    loadCategoriaData();
    
    // Event listener para atualizar produtos quando localStorage mudar
    const handleStorageChange = () => {
      console.log('Storage changed, reloading category products');
      loadCategoriaData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [id]);

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title={categoria} />

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Carregando produtos...</p>
          </div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                favorito={false}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 max-w-xs">
              Não encontramos produtos nesta categoria no momento.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriaDetalhe;
