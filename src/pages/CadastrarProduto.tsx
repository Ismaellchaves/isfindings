
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, X, Plus, Minus } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CATEGORIAS = [
  'Acessórios Femininos',
  'Acessórios Masculinos',
  'Roupas Femininas',
  'Roupas Masculinas',
  'Calçados Femininos',
  'Calçados Masculinos',
  'Outros'
];

const TAMANHOS = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
const TAGS = ['Novo', 'Promoção', 'Destaque', 'Esgotando'];

const CadastrarProduto: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [precoAntigo, setPrecoAntigo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cores, setCores] = useState<string[]>([]);
  const [corInput, setCorInput] = useState('');
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>([]);
  const [tagsSelecionadas, setTagsSelecionadas] = useState<string[]>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Verificar tamanho do arquivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro no upload",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAddCor = () => {
    if (corInput && !cores.includes(corInput)) {
      setCores([...cores, corInput]);
      setCorInput('');
    }
  };
  
  const handleRemoveCor = (cor: string) => {
    setCores(cores.filter(c => c !== cor));
  };
  
  const toggleTamanho = (tamanho: string) => {
    if (tamanhosSelecionados.includes(tamanho)) {
      setTamanhosSelecionados(tamanhosSelecionados.filter(t => t !== tamanho));
    } else {
      setTamanhosSelecionados([...tamanhosSelecionados, tamanho]);
    }
  };
  
  const toggleTag = (tag: string) => {
    if (tagsSelecionadas.includes(tag)) {
      setTagsSelecionadas(tagsSelecionadas.filter(t => t !== tag));
    } else {
      setTagsSelecionadas([...tagsSelecionadas, tag]);
    }
  };
  
  const formatarPreco = (valor: string) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/[^0-9]/g, '');
    
    if (!apenasNumeros) return '';
    
    // Converter para float (dividindo por 100 para considerar centavos)
    const numero = parseInt(apenasNumeros) / 100;
    
    // Formatar como moeda brasileira
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };
  
  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreco(formatarPreco(e.target.value));
  };
  
  const handlePrecoAntigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecoAntigo(formatarPreco(e.target.value));
  };
  
  const validarURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!nome) {
      toast({ title: "Erro", description: "Nome do produto é obrigatório", variant: "destructive" });
      return;
    }
    
    if (!preco) {
      toast({ title: "Erro", description: "Preço atual é obrigatório", variant: "destructive" });
      return;
    }
    
    if (!categoria) {
      toast({ title: "Erro", description: "Categoria é obrigatória", variant: "destructive" });
      return;
    }
    
    if (!link) {
      toast({ title: "Erro", description: "Link de compra é obrigatório", variant: "destructive" });
      return;
    }
    
    if (!validarURL(link)) {
      toast({ title: "Erro", description: "Link de compra inválido", variant: "destructive" });
      return;
    }
    
    // Converter preços de string para número
    const precoNum = parseFloat(preco.replace(/\./g, '').replace(',', '.'));
    const precoAntigoNum = precoAntigo ? parseFloat(precoAntigo.replace(/\./g, '').replace(',', '.')) : undefined;
    
    setIsLoading(true);
    
    // Simular cadastro (aqui você integraria com seu backend)
    setTimeout(() => {
      // Gerar ID único
      const id = `prod_${Date.now()}`;
      
      // Criando objeto do produto
      const novoProduto = {
        id,
        nome,
        preco: precoNum,
        precoAntigo: precoAntigoNum,
        categoria,
        imagem: previewImage || '/placeholder.svg',
        descricao,
        cores,
        tamanhos: tamanhosSelecionados,
        link,
        data_publicacao: new Date().toISOString(),
        status: 'ativo'
      };
      
      console.log("Produto cadastrado:", novoProduto);
      
      setIsLoading(false);
      toast({
        title: "Produto cadastrado com sucesso!",
        description: `${nome} foi adicionado à loja.`
      });
      
      navigate('/admin/produtos');
    }, 1500);
  };
  
  return (
    <>
      <StatusBar />
      <div className="page-container pb-20">
        <div className="flex items-center justify-between py-4 mb-6">
          <button 
            onClick={() => navigate('/admin/produtos')} 
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Voltar</span>
          </button>
          <h1 className="title-text">Cadastrar Produto</h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload de Imagem */}
          <div className="flex flex-col items-center">
            <Card className={cn(
              "w-full h-64 flex flex-col items-center justify-center cursor-pointer border-dashed",
              previewImage ? "border-none p-0 overflow-hidden" : "border-2 p-4"
            )}>
              <label htmlFor="produto-imagem" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Upload className="w-10 h-10 mb-2" />
                    <p className="text-sm mb-1">Clique para fazer upload</p>
                    <p className="text-xs">JPG, PNG (max. 5MB)</p>
                  </div>
                )}
                <input 
                  type="file" 
                  id="produto-imagem" 
                  accept="image/*"
                  className="sr-only" 
                  onChange={handleImageUpload}
                />
              </label>
            </Card>
          </div>
          
          {/* Dados Básicos */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do produto *</Label>
              <Input 
                id="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Pulseira de Presente para Meninas"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preco">Preço atual (R$) *</Label>
                <Input 
                  id="preco" 
                  value={preco}
                  onChange={handlePrecoChange}
                  placeholder="Ex: 29,90"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="precoAntigo">Preço antigo (R$)</Label>
                <Input 
                  id="precoAntigo" 
                  value={precoAntigo}
                  onChange={handlePrecoAntigoChange}
                  placeholder="Ex: 39,90"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select 
                value={categoria} 
                onValueChange={setCategoria}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="link">Link de compra *</Label>
              <Input 
                id="link" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea 
                id="descricao" 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição detalhada do produto..."
                className="min-h-32"
              />
              <p className="text-xs text-gray-500 mt-1">
                {descricao.length}/500 caracteres
              </p>
            </div>
          </div>
          
          {/* Cores */}
          <div>
            <Label>Cores disponíveis</Label>
            <div className="flex gap-2 mb-2">
              <Input 
                value={corInput}
                onChange={(e) => setCorInput(e.target.value)}
                placeholder="Ex: Preto, Azul, Vermelho"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddCor}
                variant="outline"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {cores.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cores.map(cor => (
                  <div
                    key={cor}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                  >
                    <span>{cor}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCor(cor)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Tamanhos */}
          <div>
            <Label>Tamanhos disponíveis</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {TAMANHOS.map(tamanho => (
                <button
                  key={tamanho}
                  type="button"
                  onClick={() => toggleTamanho(tamanho)}
                  className={cn(
                    "border rounded-md w-12 h-10 flex items-center justify-center text-sm",
                    tamanhosSelecionados.includes(tamanho) 
                      ? "bg-orange-100 border-orange-500 text-orange-700" 
                      : "border-gray-200 text-gray-700"
                  )}
                >
                  {tamanho}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "border rounded-md px-3 py-1 flex items-center justify-center text-sm",
                    tagsSelecionadas.includes(tag) 
                      ? "bg-orange-100 border-orange-500 text-orange-700" 
                      : "border-gray-200 text-gray-700"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Botão de Submissão */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Publicando..." : "Publicar Produto"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CadastrarProduto;
