
import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import { metodosPagamento } from '@/lib/dados';

const MetodoPagamento: React.FC = () => {
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title="Método de Pagamento" />
        
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Pagamento Via Loja</h2>
          
          <div className="space-y-3">
            {metodosPagamento.slice(0, 2).map((metodo) => (
              <div key={metodo.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <img src={metodo.imagem} alt={metodo.nome} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{metodo.nome}</h3>
                    <p className="text-xs text-gray-500">{metodo.descricao}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Cartão de Débito/Crédito</h2>
          
          <div className="space-y-3">
            {metodosPagamento.slice(2, 4).map((metodo) => (
              <div key={metodo.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <img src={metodo.imagem} alt={metodo.nome} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{metodo.nome}</h3>
                    <p className="text-xs text-gray-500">{metodo.descricao}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Transferência Bancária</h2>
          
          <div className="space-y-3">
            {metodosPagamento.slice(4).map((metodo) => (
              <div key={metodo.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <img src={metodo.imagem} alt={metodo.nome} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{metodo.nome}</h3>
                    {metodo.descricao && (
                      <p className="text-xs text-gray-500">{metodo.descricao}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        
        <button className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          <span>Adicionar Novo Método</span>
        </button>
      </div>
    </>
  );
};

export default MetodoPagamento;
