import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import { categorias, produtos } from '@/lib/dados'; // Importe os produtos
import { Button } from '@/components/ui/button';

const Categorias: React.FC = () => {
  const [generoAtivo, setGeneroAtivo] = useState<'feminino' | 'masculino'>('feminino');

  // Filtra as categorias com base no gênero selecionado
  const categoriasFemininas = categorias.filter(cat => cat.genero === 'feminino');
  const categoriasMasculinas = categorias.filter(cat => cat.genero === 'masculino');
  const categoriasAtivas = generoAtivo === 'feminino' ? categoriasFemininas : categoriasMasculinas;

  // Filtra os produtos com base no gênero selecionado
  const produtosFiltrados = produtos.filter(produto =>
    generoAtivo === 'feminino' ? produto.id.endsWith('-f') : produto.id.endsWith('-m')
  );

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
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="flex flex-col items-center p-3 bg-white rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              <img src={produto.imagem} alt={produto.nome} className="w-16 h-16 mb-2" />
              <span className="text-xs text-center font-medium">{produto.nome}</span>
              <span className="text-xs text-gray-500">R$ {produto.preco.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categorias;