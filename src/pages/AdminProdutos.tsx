
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, Edit, Trash2 } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Produto } from '@/lib/tipos';
import { produtos } from '@/lib/dados';

const AdminProdutos: React.FC = () => {
  const navigate = useNavigate();
  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [produtosAtivos, setProdutosAtivos] = useState<Produto[]>([]);
  const [produtosInativos, setProdutosInativos] = useState<Produto[]>([]);

  useEffect(() => {
    // Inicializa com os produtos do arquivo de dados
    setTodosProdutos(produtos);
    
    // Filtra produtos ativos (status === 'ativo' ou undefined/null)
    const ativos = produtos.filter(p => p.status !== 'inativo');
    setProdutosAtivos(ativos);
    
    // Filtra produtos inativos
    const inativos = produtos.filter(p => p.status === 'inativo');
    setProdutosInativos(inativos);
  }, []);

  const handleEdit = (produtoId: string) => {
    // Navegar para página de edição (a ser implementada no futuro)
    console.log("Editar produto:", produtoId);
    // navigate(`/admin/produtos/editar/${produtoId}`);
  };

  const handleDelete = (produtoId: string) => {
    // Confirmar exclusão
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      console.log("Produto excluído:", produtoId);
      // Aqui você implementaria a exclusão real do produto
      const produtosAtualizados = todosProdutos.filter(p => p.id !== produtoId);
      setTodosProdutos(produtosAtualizados);
      
      // Atualiza as listas filtradas
      const ativosAtualizados = produtosAtivos.filter(p => p.id !== produtoId);
      setProdutosAtivos(ativosAtualizados);
      
      const inativosAtualizados = produtosInativos.filter(p => p.id !== produtoId);
      setProdutosInativos(inativosAtualizados);
    }
  };

  // Componente de card de produto reutilizável
  const ProdutoCard = ({ produto }: { produto: Produto }) => (
    <Card key={produto.id} className="overflow-hidden">
      <div className="h-32 bg-gray-100 overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium truncate">{produto.nome}</h3>
        <div className="flex items-center mt-1 mb-2">
          <span className="font-bold text-orange-500">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
          {produto.precoAntigo && (
            <span className="text-gray-400 text-sm line-through ml-2">
              R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        <div className="flex justify-between mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEdit(produto.id)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => handleDelete(produto.id)}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Template para exibir uma grade de produtos ou mensagem quando vazio
  const ProdutosGrid = ({ produtos, mensagemVazio }: { produtos: Produto[], mensagemVazio: string }) => (
    <>
      {produtos.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-20">
          {produtos.map(produto => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">{mensagemVazio}</p>
          <Button 
            onClick={() => navigate('/admin/produtos/cadastrar')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Cadastrar Produto
          </Button>
        </div>
      )}
    </>
  );

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <div className="flex items-center justify-between py-4 mb-6">
          <button 
            onClick={() => navigate('/perfil')} 
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Voltar</span>
          </button>
          <h1 className="title-text">Gerenciar Produtos</h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="inativos">Inativos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos" className="pt-2">
            <ProdutosGrid 
              produtos={todosProdutos} 
              mensagemVazio="Nenhum produto cadastrado" 
            />
          </TabsContent>
          
          <TabsContent value="ativos">
            <ProdutosGrid 
              produtos={produtosAtivos} 
              mensagemVazio="Nenhum produto ativo" 
            />
          </TabsContent>
          
          <TabsContent value="inativos">
            <ProdutosGrid 
              produtos={produtosInativos} 
              mensagemVazio="Nenhum produto inativo" 
            />
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={() => navigate('/admin/produtos/cadastrar')} 
            className="h-14 w-14 rounded-full"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminProdutos;
