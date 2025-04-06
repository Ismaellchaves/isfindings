export interface Produto {
  id: string;
  nome: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  categoria: string;
  descricao: string;
  cores?: string[];
  tamanhos?: string[];
  link?: string;
  data_publicacao?: string;
  status?: 'ativo' | 'inativo';
  genero?: 'masculino' | 'feminino' | 'unissex';
}

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  genero?: 'feminino' | 'masculino' | 'unissex';
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  foto: string;
}

export interface Endereco {
  id: string;
  nome: string;
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
  padrao: boolean;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  tamanho?: string;
  cor?: string;
}

export interface MetodoPagamento {
  id: string;
  tipo: 'cartao' | 'paypal' | 'shopPay' | 'linePay' | 'transferencia';
  nome: string;
  descricao?: string;
  imagem: string;
  ultimosDigitos?: string;
}

export interface FiltroProduto {
  precoMin: number;
  precoMax: number;
  categorias: string[];
  disponibilidade: string[];
  marcas: string[];
}
