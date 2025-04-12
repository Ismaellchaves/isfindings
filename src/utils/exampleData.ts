
import { Produto } from '@/lib/tipos';
import { generateId } from '@/utils/id';
import { produtos as produtosDados } from '@/lib/dados';

// Produtos de exemplo para garantir que sempre existam dados para visualização
export const produtosExemplo: Produto[] = [
  {
    id: generateId(),
    nome: "Camiseta Básica",
    preco: 49.90,
    categoria: "Camisetas",
    descricao: "Camiseta básica de algodão de alta qualidade",
    imagem: "https://via.placeholder.com/300x300?text=Camiseta",
    cores: ["Preto", "Branco", "Cinza"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "unissex",
    link: "https://example.com/camiseta",
    status: "ativo"
  },
  {
    id: generateId(),
    nome: "Calça Jeans Skinny",
    preco: 129.90,
    precoAntigo: 159.90,
    categoria: "Calças",
    descricao: "Calça jeans skinny de alta elasticidade",
    imagem: "https://via.placeholder.com/300x300?text=Calca+Jeans",
    cores: ["Azul Escuro", "Azul Claro", "Preto"],
    tamanhos: ["36", "38", "40", "42", "44"],
    genero: "feminino",
    link: "https://example.com/calca-jeans",
    status: "ativo"
  },
  {
    id: generateId(),
    nome: "Tênis Casual",
    preco: 199.90,
    categoria: "Calçados",
    descricao: "Tênis casual confortável para o dia a dia",
    imagem: "https://via.placeholder.com/300x300?text=Tenis+Casual",
    cores: ["Preto", "Branco", "Cinza"],
    tamanhos: ["39", "40", "41", "42", "43"],
    genero: "masculino",
    link: "https://example.com/tenis-casual",
    status: "ativo"
  },
  {
    id: generateId(),
    nome: "Vestido Floral",
    preco: 89.90,
    categoria: "Vestidos",
    descricao: "Vestido floral de verão, leve e confortável",
    imagem: "https://via.placeholder.com/300x300?text=Vestido+Floral",
    cores: ["Estampa Floral", "Azul", "Rosa"],
    tamanhos: ["P", "M", "G"],
    genero: "feminino",
    link: "https://example.com/vestido-floral",
    status: "ativo"
  },
  {
    id: generateId(),
    nome: "Camisa Social",
    preco: 119.90,
    categoria: "Camisas",
    descricao: "Camisa social slim fit para ocasiões formais",
    imagem: "https://via.placeholder.com/300x300?text=Camisa+Social",
    cores: ["Branco", "Azul Claro", "Rosa Claro"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "masculino",
    link: "https://example.com/camisa-social",
    status: "ativo"
  }
];

// Função para disparar evento de mudança no localStorage
function triggerStorageUpdate() {
  // Disparar evento customizado para notificar outros componentes
  window.dispatchEvent(new Event('storage'));
  
  // Também disparamos um evento personalizado que será capturado por qualquer dispositivo
  try {
    localStorage.setItem('last_update', new Date().toISOString());
  } catch (error) {
    console.error('Erro ao atualizar timestamp:', error);
  }
}

// Função para obter todos os produtos do localStorage e dados.ts
export function obterTodosProdutos(): Produto[] {
  try {
    const storedProdutos = localStorage.getItem('produtos');
    let produtos: Produto[] = [];
    
    if (storedProdutos) {
      // Combine localStorage products with dados.ts products, avoiding duplicates
      const storedProdutosArray = JSON.parse(storedProdutos);
      
      // Add produtos from localStorage
      produtos = [...storedProdutosArray];
      
      // Add produtos from dados.ts that aren't already in localStorage
      produtosDados.forEach(produto => {
        if (!produtos.some(p => p.id === produto.id)) {
          produtos.push(produto);
        }
      });
      
      console.log('Total de produtos carregados:', produtos.length);
    } else {
      // Se não existirem produtos armazenados, combinar os dados
      produtos = [...produtosExemplo, ...produtosDados];
      localStorage.setItem('produtos', JSON.stringify(produtos));
      console.log('Produtos combinados carregados com sucesso! Total:', produtos.length);
    }
    
    return produtos;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    // Fallback to return all produtos from dados.ts
    return produtosDados;
  }
}

// Função para garantir que existam dados de exemplo no localStorage
export function garantirDadosExemplo() {
  try {
    const storedProdutos = localStorage.getItem('produtos');
    
    // Se não existirem produtos armazenados, carrega os exemplos e dados iniciais
    if (!storedProdutos) {
      const todosProdutos = [...produtosExemplo, ...produtosDados];
      localStorage.setItem('produtos', JSON.stringify(todosProdutos));
      console.log('Produtos de exemplo e dados iniciais carregados com sucesso! Total:', todosProdutos.length);
      
      // Notificar outros componentes
      triggerStorageUpdate();
    } else {
      // Verificar se todos os produtos de dados.ts estão no localStorage
      const storedProdutosArray = JSON.parse(storedProdutos);
      let produtosAtualizados = [...storedProdutosArray];
      let adicionados = 0;
      
      produtosDados.forEach(produto => {
        if (!produtosAtualizados.some(p => p.id === produto.id)) {
          produtosAtualizados.push(produto);
          adicionados++;
        }
      });
      
      if (adicionados > 0) {
        localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
        console.log(`Adicionados ${adicionados} produtos de dados.ts que não estavam no localStorage`);
        
        // Notificar outros componentes
        triggerStorageUpdate();
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados de exemplo:', error);
  }
}

// Função para salvar produtos no localStorage e notificar componentes
export function salvarProdutos(produtos: Produto[]) {
  try {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    console.log('Produtos salvos com sucesso! Total:', produtos.length);
    
    // Notificar outros componentes
    triggerStorageUpdate();
    return true;
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
    return false;
  }
}

// Nova função para verificar atualizações de produtos em outros dispositivos
export function configurarVerificacaoAtualizacao(callback: () => void) {
  // Ouvir evento storage padrão para atualização cross-tab
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'produtos' || event.key === 'last_update') {
      console.log('Dados atualizados em outro dispositivo/aba, recarregando produtos');
      callback();
    }
  };

  // Adiciona listener para eventos de storage de outros dispositivos/abas
  window.addEventListener('storage', handleStorageChange);
  
  // Também verifica periodicamente para garantir atualização em todos os dispositivos
  const intervalId = setInterval(() => {
    callback();
  }, 60000); // Verifica a cada minuto
  
  // Retorna função para remover os listeners quando necessário
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    clearInterval(intervalId);
  };
}
