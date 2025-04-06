
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, Edit, Trash2, Search, Filter } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Produto } from '@/lib/tipos';
import { produtos as dadosProdutos } from '@/lib/dados';

const AdminProdutos: React.FC = () => {
  const navigate = useNavigate();
  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [produtosAtivos, setProdutosAtivos] = useState<Produto[]>([]);
  const [produtosInativos, setProdutosInativos] = useState<Produto[]>([]);
  const [deleteProdutoId, setDeleteProdutoId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('');
  const [generoFilter, setGeneroFilter] = useState<string>('');

  // Lista de categorias únicas
  const uniqueCategorias = Array.from(new Set(todosProdutos.map(p => p.categoria)));
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // Carrega os produtos do localStorage, ou usa os padrões se não houver dados
    const storedProdutos = localStorage.getItem('produtos');
    const produtosData = storedProdutos ? JSON.parse(storedProdutos) : dadosProdutos;
    
    setTodosProdutos(produtosData);
    
    // Filtra produtos ativos (status === 'ativo' ou undefined/null)
    const ativos = produtosData.filter((p: Produto) => p.status !== 'inativo');
    setProdutosAtivos(ativos);
    
    // Filtra produtos inativos
    const inativos = produtosData.filter((p: Produto) => p.status === 'inativo');
    setProdutosInativos(inativos);
  };

  const updateLocalStorage = (produtos: Produto[]) => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  };

  const handleEdit = (produtoId: string) => {
    navigate(`/admin/produtos/editar/${produtoId}`);
  };

  const openDeleteDialog = (produtoId: string) => {
    setDeleteProdutoId(produtoId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteProdutoId) return;
    
    // Atualiza as listas removendo o produto excluído
    const produtosAtualizados = todosProdutos.filter(p => p.id !== deleteProdutoId);
    setTodosProdutos(produtosAtualizados);
    
    const ativosAtualizados = produtosAtivos.filter(p => p.id !== deleteProdutoId);
    setProdutosAtivos(ativosAtualizados);
    
    const inativosAtualizados = produtosInativos.filter(p => p.id !== deleteProdutoId);
    setProdutosInativos(inativosAtualizados);
    
    // Atualiza o localStorage
    updateLocalStorage(produtosAtualizados);
    
    // Feedback para o usuário
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso.",
    });
    
    // Fecha o diálogo
    setDeleteDialogOpen(false);
    setDeleteProdutoId(null);
  };

  const filterProducts = (produtos: Produto[]) => {
    return produtos.filter(produto => {
      const matchesSearch = searchTerm === '' || 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategoria = categoriaFilter === '' || produto.categoria === categoriaFilter;
      
      const matchesGenero = generoFilter === '' || produto.genero === generoFilter;
      
      return matchesSearch && matchesCategoria && matchesGenero;
    });
  };

  // Componente de card de produto reutilizável
  const ProdutoCard = ({ produto }: { produto: Produto }) => (
    <Card key={produto.id} className="overflow-hidden">
      <div className="h-32 bg-gray-100 overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
          }}
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium truncate">{produto.nome}</h3>
        <div className="flex items-center mt-1 mb-1">
          <span className="font-bold text-orange-500">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
          {produto.precoAntigo && (
            <span className="text-gray-400 text-sm line-through ml-2">
              R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mb-2">
          <span className="bg-gray-100 rounded-full px-2 py-0.5 mr-1">{produto.categoria}</span>
          {produto.genero && (
            <span className="bg-gray-100 rounded-full px-2 py-0.5">{produto.genero}</span>
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
            onClick={() => openDeleteDialog(produto.id)}
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
  const ProdutosGrid = ({ produtos, mensagemVazio }: { produtos: Produto[], mensagemVazio: string }) => {
    const filteredProdutos = filterProducts(produtos);
    
    return (
      <>
        {filteredProdutos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-20">
            {filteredProdutos.map(produto => (
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
  };

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
        
        {/* Filtros */}
        <div className="mb-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar produtos..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                setSearchTerm('');
                setCategoriaFilter('');
                setGeneroFilter('');
              }}
            >
              <Filter className="h-4 w-4" />
              Limpar
            </Button>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectGroup>
                    {uniqueCategorias.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={generoFilter} onValueChange={setGeneroFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os gêneros</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="unissex">Unissex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminProdutos;
