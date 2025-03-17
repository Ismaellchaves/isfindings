import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Tipo correto para o temporizador

  useEffect(() => {
    // Define um temporizador para redirecionar automaticamente após 3 segundos
    timerRef.current = setTimeout(() => {
      navigate('/home');
    }, 3000);

    // Limpa o temporizador quando o componente é desmontado
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigate]);

  // Função para iniciar as compras manualmente
  const handleStartShopping = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Cancela o temporizador
    }
    navigate('/home'); // Redireciona para a página inicial
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Conteúdo principal */}
      <div className="animate-scale-in flex flex-col items-center">
        {/* Título da marca */}
        <div className="text-5xl font-bold mb-4 text-orange-500 tracking-wider">
          ISFINDINGS
        </div>
        <div className="w-16 h-1 bg-orange-400 rounded mb-6"></div>
        <div className="text-lg text-gray-700 font-medium mb-8">
          Sua moda, seu estilo
        </div>

        {/* Botão "Começar as compras" */}
        <button
          onClick={handleStartShopping}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Começar as compras
          <ArrowRight size={20} /> {/* Ajuste no tamanho do ícone */}
        </button>
      </div>

      {/* Indicador de carregamento animado */}
      <div className="absolute bottom-16 flex space-x-2">
        {[0, 0.2, 0.4].map((delay, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"
            style={{ animationDelay: `${delay}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;