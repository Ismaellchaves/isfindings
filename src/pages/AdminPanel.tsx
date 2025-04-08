
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, CreditCard } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  
  // Verificar se o usuário está autenticado como administrador
  React.useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/perfil');
    }
  }, [navigate]);

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
