
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, CreditCard, Package2, BaggageClaim } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { Produto } from '@/lib/tipos';
import { produtos as produtosIniciais } from '@/lib/dados';
import { garantirDadosExemplo } from '@/utils/exampleData';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [produtosCount, setProdutosCount] = useState(0);
  const [categoriasCount, setCategoriasCount] = useState(0);
  
  // Verificar se o usuário está autenticado como administrador
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/perfil');
    }
  }, [navigate]);

  // Carregar contagem de produtos e categorias
  useEffect(() => {
    try {
      // Garantir que existam dados de exemplo
      garantirDadosExemplo();

      // Carregar produtos do localStorage
      const storedProdutos = localStorage.getItem('produtos');
      let produtos: Produto[] = [];
      
      if (storedProdutos) {
        produtos = JSON.parse(storedProdutos);
      } else {
        // Se não houver produtos em localStorage, usar dados iniciais
        produtos = produtosIniciais;
      }
      
      setProdutosCount(produtos.length);
      
      // Extrair categorias únicas
      const categorias = [...new Set(produtos.map(produto => produto.categoria))];
      setCategoriasCount(categorias.length);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do painel.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <>
      <StatusBar />
      <div className="page-container pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/perfil')}
            size="icon"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="bg-orange-100 rounded-xl p-6 text-center mb-6">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">Bem-vindo à Área Restrita</h2>
            <p className="text-orange-700">
              Aqui você pode gerenciar todos os produtos e categorias do seu aplicativo.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold">{produtosCount}</span>
                  <span className="block text-sm text-gray-500">Produtos</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BaggageClaim className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold">{categoriasCount}</span>
                  <span className="block text-sm text-gray-500">Categorias</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            variant="default" 
            className="w-full flex items-center justify-between p-6 text-left h-auto"
            onClick={() => navigate('/admin/categorias')}
          >
            <span className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Layers className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="block font-bold">Gerenciar Categorias</span>
                <span className="text-sm opacity-75">Visualize e organize categorias de produtos</span>
              </div>
            </span>
          </Button>
          
          <Button 
            variant="default" 
            className="w-full flex items-center justify-between p-6 text-left h-auto"
            onClick={() => navigate('/admin/produtos')}
          >
            <span className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="block font-bold">Gerenciar Produtos</span>
                <span className="text-sm opacity-75">Adicione, edite ou remova produtos</span>
              </div>
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
