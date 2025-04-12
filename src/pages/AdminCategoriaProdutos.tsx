
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Produto } from '@/lib/tipos';
import { garantirDadosExemplo, obterTodosProdutos, salvarProdutos, configurarVerificacaoAtualizacao } from '@/utils/exampleData';

const AdminCategoriaProdutos: React.FC = () => {
  const navigate = useNavigate();
  const { categoria } = useParams<{ categoria: string }>();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Garantir que existam dados de exemplo
    garantirDadosExemplo();
    loadProdutos();
    
    // Configurar verificação de atualizações em outros dispositivos
    const cleanupVerificacao = configurarVerificacaoAtualizacao(loadProdutos);
    
    return () => {
      cleanupVerificacao();
    };
  }, [categoria]);

  const loadProdutos = () => {
    try {
      setLoading(true);
      // Obter todos os produtos (localStorage + dados.ts)
      const todosProdutos = obterTodosProdutos();
      setProdutos(todosProdutos);
        
      // Filtrar produtos pela categoria
      if (categoria) {
        const filtrados = todosProdutos.filter(
          p => p.categoria === decodeURIComponent(categoria)
        );
        setProdutosFiltrados(filtrados);
      }
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

  const handleDeleteProduto = (id: string) => {
    setProdutoToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteProduto = () => {
    if (!produtoToDelete) return;

    try {
      const updatedProdutos = produtos.filter(p => p.id !== produtoToDelete);
      // Usar nova função salvarProdutos para salvar e notificar
      salvarProdutos(updatedProdutos);
      setProdutos(updatedProdutos);
      setProdutosFiltrados(prev => prev.filter(p => p.id !== produtoToDelete));
      
      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o produto.",
        variant: "destructive",
      });
    } finally {
      setDeleteConfirmOpen(false);
      setProdutoToDelete(null);
    }
  };

  return (
    <>
      <StatusBar />
      <div className="page-container pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/categorias')}
            size="icon"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{categoria ? decodeURIComponent(categoria) : 'Categoria'}</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p>Carregando produtos...</p>
          </div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {produtosFiltrados.map((produto) => (
              <Card key={produto.id} className="overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={produto.imagem || 'https://via.placeholder.com/150'} 
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium truncate">{produto.nome}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>Preço: R$ {produto.preco.toFixed(2)}</div>
                    <div>Gênero: {produto.genero || 'Unissex'}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/produtos/editar/${produto.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProduto(produto.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">Nenhum produto encontrado nesta categoria.</p>
            <Button onClick={() => navigate('/admin/produtos/cadastrar')}>
              Adicionar Produto
            </Button>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir Produto</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteProduto}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminCategoriaProdutos;
