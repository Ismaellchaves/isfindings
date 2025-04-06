
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Favoritos from "./pages/Favoritos";
import Detalhes from "./pages/Detalhes";
import Perfil from "./pages/Perfil";
import Categorias from "./pages/Categorias";
import Carrinho from "./pages/Carrinho";
import MetodoPagamento from "./pages/MetodoPagamento";
import Filtro from "./pages/Filtro";
import NotFound from "./pages/NotFound";
import Enderecos from "./pages/Enderecos";
import Carteira from "./pages/Carteira";
import Termos from "./pages/Termos";
import Suporte from "./pages/Suporte";
import CategoriaDetalhe from "./pages/CategoriaDetalhe";
import AdminProdutos from "./pages/AdminProdutos";
import CadastrarProduto from "./pages/CadastrarProduto";

// Cria uma instância do QueryClient para gerenciamento de estado global
const queryClient = new QueryClient();

const App = () => {
  // Função para verificar se o usuário já visitou o aplicativo
  const checkHasVisited = () => {
    try {
      const hasVisited = localStorage.getItem("hasVisited");
      console.log("Valor de hasVisited no localStorage:", hasVisited);
      return hasVisited;
    } catch (error) {
      console.error("Erro ao acessar localStorage:", error);
      return null;
    }
  };

  // Define a rota inicial com base no valor de `hasVisited`
  const hasVisited = checkHasVisited();
  let initialRoute = "/home"; // Rota padrão

  // Atualiza o localStorage para indicar que o usuário visitou o aplicativo
  if (!hasVisited) {
    try {
      localStorage.setItem("hasVisited", "true");
      initialRoute = "/welcome"; // Altera a rota inicial para "/welcome" (em minúsculas)
      console.log("Usuário nunca visitou. Definindo rota inicial como /welcome.");
    } catch (error) {
      console.error("Erro ao atualizar localStorage:", error);
    }
  } else {
    console.log("Usuário já visitou. Definindo rota inicial como /home.");
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* Fornece suporte para tooltips */}
      <TooltipProvider>
        {/* Componentes de notificação */}
        <Toaster />
        <Sonner />

        {/* Configuração do React Router */}
        <BrowserRouter>
          <Routes>
            {/* Redirecionamento padrão para a rota inicial */}
            <Route path="/" element={<Navigate to={initialRoute} replace />} />

            {/* Rotas principais */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/home" element={<Index />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:id" element={<CategoriaDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/metodopagamento" element={<MetodoPagamento />} />
            <Route path="/filtro" element={<Filtro />} />
            <Route path="/enderecos" element={<Enderecos />} />
            <Route path="/carteira" element={<Carteira />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/suporte" element={<Suporte />} />
            
            {/* Rotas de Admin */}
            <Route path="/admin/produtos" element={<AdminProdutos />} />
            <Route path="/admin/produtos/cadastrar" element={<CadastrarProduto />} />

            {/* Rota fallback para páginas não encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
