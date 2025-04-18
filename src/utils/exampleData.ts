
import { Produto } from '@/lib/tipos';
import { generateId } from '@/utils/id';
import { produtos as produtosDados } from '@/lib/dados';

// Chave usada para armazenar o timestamp da última atualização
const LAST_UPDATE_KEY = 'produtos_ultima_atualizacao';

// Função para disparar evento de mudança no localStorage
function triggerStorageUpdate() {
  // Disparar evento customizado para notificar outros componentes
  window.dispatchEvent(new Event('storage'));
  
  // Armazenar o timestamp da última atualização
  try {
    const timestamp = new Date().toISOString();
    localStorage.setItem(LAST_UPDATE_KEY, timestamp);
    console.log('Atualização disparada com timestamp:', timestamp);
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
      // Se não existirem produtos armazenados, usar apenas os dados do arquivo
      produtos = [...produtosDados];
      localStorage.setItem('produtos', JSON.stringify(produtos));
      console.log('Produtos carregados com sucesso! Total:', produtos.length);
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
    
    // Se não existirem produtos armazenados, carrega apenas os dados iniciais
    if (!storedProdutos) {
      const todosProdutos = [...produtosDados];
      localStorage.setItem('produtos', JSON.stringify(todosProdutos));
      console.log('Dados iniciais carregados com sucesso! Total:', todosProdutos.length);
      
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
    // Adicionar data de publicação se não existir
    const produtosComData = produtos.map(produto => {
      if (!produto.data_publicacao) {
        return {
          ...produto,
          data_publicacao: new Date().toISOString()
        };
      }
      return produto;
    });
    
    localStorage.setItem('produtos', JSON.stringify(produtosComData));
    console.log('Produtos salvos com sucesso! Total:', produtosComData.length);
    
    // Notificar outros componentes
    triggerStorageUpdate();
    return true;
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
    return false;
  }
}

// Função para verificar atualizações de produtos em outros dispositivos
export function configurarVerificacaoAtualizacao(callback: () => void) {
  let lastCheckedTimestamp: string | null = null;
  
  // Verificar timestamp atual
  lastCheckedTimestamp = localStorage.getItem(LAST_UPDATE_KEY);
  
  // Função que verifica se houve atualizações
  const verificarAtualizacoes = () => {
    const currentTimestamp = localStorage.getItem(LAST_UPDATE_KEY);
    
    // Se houver uma nova atualização (timestamp diferente)
    if (currentTimestamp && currentTimestamp !== lastCheckedTimestamp) {
      console.log('Detectada atualização em outro dispositivo:', currentTimestamp);
      lastCheckedTimestamp = currentTimestamp;
      callback();
    }
  };
  
  // Ouvir evento storage padrão para atualização cross-tab
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'produtos' || event.key === LAST_UPDATE_KEY) {
      console.log('Dados atualizados em outro dispositivo/aba, recarregando produtos');
      callback();
    }
  };

  // Adiciona listener para eventos de storage de outros dispositivos/abas
  window.addEventListener('storage', handleStorageChange);
  
  // Verificar atualizações mais frequentemente (a cada 15 segundos)
  const intervalId = setInterval(verificarAtualizacoes, 15000);
  
  // Retorna função para remover os listeners quando necessário
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    clearInterval(intervalId);
  };
}

// Função para limpar os produtos de exemplo do localStorage
export function limparProdutosExemplo() {
  try {
    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) {
      const produtosArray = JSON.parse(storedProdutos);
      // Filtra os produtos, removendo os produtos problemáticos pelo nome
      const nomesProdutosExemplo = ['Camiseta Básica', 'Calça Jeans Skinny', 'Tênis Casual', 'Vestido Floral', 'Camisa Social'];
      const produtosFiltrados = produtosArray.filter(
        (produto: Produto) => !nomesProdutosExemplo.includes(produto.nome)
      );
      localStorage.setItem('produtos', JSON.stringify(produtosFiltrados));
      console.log(`Produtos de exemplo removidos. Total restante: ${produtosFiltrados.length}`);
      triggerStorageUpdate();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao limpar produtos de exemplo:', error);
    return false;
  }
}
