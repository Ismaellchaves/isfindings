
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Produto } from '@/lib/tipos';

const AdminProdutos: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);

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
            <div className="flex flex-col gap-4">
              {produtos.length > 0 ? (
                produtos.map(produto => (
                  <div key={produto.id} className="p-4 bg-white rounded-lg shadow-subtle">
                    <p>{produto.nome}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">Nenhum produto cadastrado</p>
                  <Button 
                    onClick={() => navigate('/admin/produtos/cadastrar')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Cadastrar Produto
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ativos">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Nenhum produto ativo</p>
            </div>
          </TabsContent>
          
          <TabsContent value="inativos">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Nenhum produto inativo</p>
            </div>
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
