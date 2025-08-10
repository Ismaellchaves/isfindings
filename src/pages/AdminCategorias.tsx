import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Produto } from '@/lib/tipos';
import { categorias } from '@/lib/dados';
import { listProducts } from '@/integrations/supabase/products';

const AdminCategorias: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState<Record<string, Produto[]>>({});
  const [categoriasUnicas, setCategoriasUnicas] = useState<string[]>([]);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const todosProdutos = await listProducts();
      setProdutos(todosProdutos);
        
      const produtosPorCat: Record<string, Produto[]> = {};
      const categoriasSet = new Set<string>();
        
      todosProdutos.forEach(produto => {
        const categoria = produto.categoria || 'Sem categoria';
        if (!produtosPorCat[categoria]) {
          produtosPorCat[categoria] = [];
        }
        produtosPorCat[categoria].push(produto);
        categoriasSet.add(categoria);
      });
        
      setProdutosPorCategoria(produtosPorCat);
      setCategoriasUnicas(Array.from(categoriasSet).sort());
      console.log(`Exibindo ${todosProdutos.length} produtos em ${categoriasSet.size} categorias`);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerTodos = (categoria: string) => {
    navigate(`/admin/categorias/${encodeURIComponent(categoria)}`);
  };

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
          <h1 className="text-2xl font-bold">Categorias de Produtos</h1>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <Button 
            onClick={() => navigate('/admin/produtos')}
            className="w-full justify-between"
          >
            Todos os Produtos ({produtos.length})
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            onClick={() => navigate('/admin/produtos/cadastrar')}
            className="w-full justify-between"
            variant="outline"
          >
            Cadastrar Novo Produto
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p>Carregando categorias...</p>
          </div>
        ) : categoriasUnicas.length > 0 ? (
          <div className="space-y-6">
            {categoriasUnicas.map((categoria) => (
              <Card key={categoria} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{categoria}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVerTodos(categoria)}
                      className="text-sm"
                    >
                      Ver todos ({produtosPorCategoria[categoria]?.length || 0}) <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {produtosPorCategoria[categoria]?.slice(0, 3).map((produto) => (
                      <div 
                        key={produto.id} 
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/produtos/editar/${produto.id}`)}
                      >
                        <div className="h-20 bg-gray-100 rounded-lg overflow-hidden mb-1">
                          <img 
                            src={produto.imagem || 'https://via.placeholder.com/150'} 
                            alt={produto.nome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                            }}
                          />
                        </div>
                        <p className="text-xs truncate">{produto.nome}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">Nenhuma categoria encontrada.</p>
            <Button onClick={() => navigate('/admin/produtos/cadastrar')}>
              Adicionar Produto
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCategorias;
