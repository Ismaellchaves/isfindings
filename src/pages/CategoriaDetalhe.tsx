import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import ProductCard from '@/components/ProductCard';
import { categorias, produtos } from '@/lib/dados';
import { Produto } from '@/lib/tipos';

const CategoriaDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [categoria, setCategoria] = useState<string>('');

  useEffect(() => {
    // Encontra a categoria com base no ID
    const categoriaEncontrada = categorias.find(cat => cat.id === id);

    if (categoriaEncontrada) {
      setCategoria(categoriaEncontrada.nome);

      // Extrai o gênero da categoria (último caractere do ID)
      const generoCategoria = categoriaEncontrada.id.split('-').pop(); // Retorna 'f' ou 'm'

      // Filtra produtos pela categoria e pelo gênero
      const produtosDaCategoria = produtos.filter(produto => {
        const generoProduto = produto.id.split('-').pop(); // Retorna 'f' ou 'm'
        return (
          produto.categoria.toLowerCase() === categoriaEncontrada.id.split('-')[0].toLowerCase() &&
          generoProduto === generoCategoria
        );
      });

      setProdutosFiltrados(produtosDaCategoria);
    }
  }, [id]);

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title={categoria} />

        {produtosFiltrados.length > 0 ? (
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