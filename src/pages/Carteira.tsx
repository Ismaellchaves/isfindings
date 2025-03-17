
import React from 'react';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import { Construction } from 'lucide-react';

const Carteira: React.FC = () => {
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title="Minha Carteira" />
        
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Construction className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Página em Construção</h2>
          <p className="text-gray-600 max-w-xs">
            Estamos trabalhando para trazer a melhor experiência para você gerenciar seus pagamentos. Volte em breve!
          </p>
        </div>
      </div>
    </>
  );
};

export default Carteira;
