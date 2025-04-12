import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from "@/hooks/use-toast";
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Produto } from '@/lib/tipos';
import { generateId } from '@/utils/id';
import ProductCategorySelect from '@/components/ProductCategorySelect';
import ProductImageUpload from '@/components/ProductImageUpload';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { obterTodosProdutos, salvarProdutos } from '@/utils/exampleData';

const produtoSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  preco: z.string().min(1, { message: 'Informe o preço' }),
  precoAntigo: z.string().optional(),
  categoria: z.string().min(1, { message: 'Informe a categoria' }),
  descricao: z.string().optional(),
  imagem: z.string().optional(),
  link: z.string().url({ message: 'URL inválida' }).min(1, { message: 'Informe o link' }),
  cores: z.string().optional(),
  tamanhos: z.string().optional(),
  genero: z.enum(['masculino', 'feminino', 'unissex']).default('unissex'),
});

type ProdutoFormValues = z.infer<typeof produtoSchema>;

const CadastrarProduto: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: '',
      preco: '',
      precoAntigo: '',
      categoria: '',
      descricao: '',
      imagem: '',
      link: '',
      cores: '',
      tamanhos: '',
      genero: 'unissex',
    },
  });

  const onSubmit = (values: ProdutoFormValues) => {
    setIsLoading(true);

    try {
      const novoProduto: Produto = {
        id: generateId(),
        nome: values.nome,
        preco: parseFloat(values.preco),
        precoAntigo: values.precoAntigo ? parseFloat(values.precoAntigo) : undefined,
        categoria: values.categoria,
        descricao: values.descricao || '',
        imagem: values.imagem || 'https://via.placeholder.com/150',
        link: values.link,
        cores: values.cores ? values.cores.split(',').map(cor => cor.trim()) : undefined,
        tamanhos: values.tamanhos ? values.tamanhos.split(',').map(tamanho => tamanho.trim()) : undefined,
        data_publicacao: new Date().toISOString(),
        status: 'ativo',
        genero: values.genero,
      };

      const produtos = obterTodosProdutos();
      produtos.push(novoProduto);
      salvarProdutos(produtos);
      
      toast({
        title: "Produto cadastrado",
        description: "O produto foi cadastrado com sucesso.",
      });
      
      navigate('/admin/produtos');
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o produto.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <div className="w-20"></div>
        </div>

        <Card className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto*</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Atual (R$)*</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          placeholder="99,90" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="precoAntigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Antigo (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          placeholder="129,90" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria*</FormLabel>
                      <FormControl>
                        <ProductCategorySelect 
                          value={field.value} 
                          onChange={field.onChange} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="unissex">Unissex</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem do Produto</FormLabel>
                    <FormControl>
                      <ProductImageUpload 
                        imageUrl={field.value} 
                        onImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o produto..." 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cores"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cores disponíveis (separadas por vírgula)</FormLabel>
                    <FormControl>
                      <Input placeholder="Preto, Branco, Vermelho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tamanhos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanhos disponíveis (separados por vírgula)</FormLabel>
                    <FormControl>
                      <Input placeholder="P, M, G, GG" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link de compra*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://loja.com/produto/123" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full mt-6 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <Save size={18} />
                {isLoading ? "Cadastrando..." : "Cadastrar Produto"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default CadastrarProduto;
