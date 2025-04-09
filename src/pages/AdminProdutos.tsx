import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Filter
} from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Produto } from '@/lib/tipos';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { categorias } from '@/lib/dados';
import { garantirDadosExemplo } from '@/utils/exampleData';

const AdminProdutos: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [filterGender, setFilterGender] = useState<string>('todos');
  const itemsPerPage = 10;

  // Get unique category names, ensuring no empty values
  const uniqueCategories = [...new Set(produtos.map(produto => produto.categoria))]
    .filter(category => category && category.trim() !== '');

  // Get unique genders
  const uniqueGenders = [...new Set(produtos.map(produto => produto.genero || 'unissex'))]
    .filter(gender => gender && gender.trim() !== '');

  useEffect(() => {
    // Garantir que existam dados de exemplo
    garantirDadosExemplo();
    // Carregar produtos
    loadProdutos();
  }, []);

  useEffect(() => {
    let results = produtos;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory && filterCategory !== 'todas') {
      results = results.filter(produto => 
        produto.categoria === filterCategory
      );
    }
    
    // Apply gender filter
    if (filterGender && filterGender !== 'todos') {
      results = results.filter(produto => 
        produto.genero === filterGender
      );
    }
    
    setFilteredProdutos(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterCategory, filterGender, produtos]);

  const loadProdutos = () => {
    try {
      setLoading(true);
      const storedProdutos = localStorage.getItem('produtos');
      if (storedProdutos) {
        const parsedProdutos = JSON.parse(storedProdutos);
        setProdutos(parsedProdutos);
        setFilteredProdutos(parsedProdutos);
      } else {
        // Se não houver produtos, carregue os dados de exemplo
        garantirDadosExemplo();
        // Tente novamente carregar os produtos
        const reloadProdutos = localStorage.getItem('produtos');
        if (reloadProdutos) {
          const parsedProdutos = JSON.parse(reloadProdutos);
          setProdutos(parsedProdutos);
          setFilteredProdutos(parsedProdutos);
        } else {
          setProdutos([]);
          setFilteredProdutos([]);
        }
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
      localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
      setProdutos(updatedProdutos);
      
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProdutos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <StatusBar />
      <div className="page-container pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
          <Button onClick={() => navigate('/admin/produtos/cadastrar')}>
            <Plus className="mr-2 h-4 w-4" /> Novo Produto
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select 
                value={filterCategory} 
                onValueChange={setFilterCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category || "categoria_default"}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={filterGender} 
                onValueChange={setFilterGender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os gêneros</SelectItem>
                  {uniqueGenders.map((gender) => (
                    <SelectItem key={gender} value={gender || "genero_default"}>
                      {gender === 'masculino' ? 'Masculino' : 
                       gender === 'feminino' ? 'Feminino' : 'Unissex'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p>Carregando produtos...</p>
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((produto) => (
                <Card key={produto.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={produto.imagem || 'https://via.placeholder.com/150'} 
                      alt={produto.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg font-medium">{produto.nome}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Categoria: {produto.categoria}</div>
                      <div>Preço: R$ {produto.preco.toFixed(2)}</div>
                      <div>Gênero: {produto.genero || 'Unissex'}</div>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">Nenhum produto encontrado.</p>
            <Button onClick={() => navigate('/admin/produtos/cadastrar')}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
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

export default AdminProdutos;
