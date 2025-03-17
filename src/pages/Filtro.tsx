
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '@/components/StatusBar';
import { FiltroProduto } from '@/lib/tipos';

const Filtro: React.FC = () => {
  const navigate = useNavigate();
  
  const [filtros, setFiltros] = useState<FiltroProduto>({
    precoMin: 5,
    precoMax: 1500,
    categorias: [],
    disponibilidade: ['emEstoque'],
    marcas: ['apple']
  });
  
  const handleClose = () => {
    navigate(-1);
  };
  
  const handleAplicarFiltro = () => {
    // Aplicar filtros e voltar
    console.log('Filtros aplicados:', filtros);
    navigate(-1);
  };
  
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <div className="flex items-center justify-between py-4 mb-6">
          <h1 className="title-text">Filtro</h1>
          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold mb-4">Faixa de preço</h2>
            <div className="flex justify-between mb-2">
              <span>R${filtros.precoMin}</span>
              <span>R${filtros.precoMax}</span>
            </div>
            <div className="relative h-1 bg-gray-200 rounded-full w-full mb-8">
              <div 
                className="absolute h-1 bg-orange-500 rounded-full" 
                style={{ left: '5%', right: '30%' }}
              ></div>
              <div 
                className="absolute w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2" 
                style={{ left: '5%' }}
              ></div>
              <div 
                className="absolute w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2" 
                style={{ left: '70%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold mb-4">Disponibilidade</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="emEstoque" 
                    name="disponibilidade" 
                    checked={filtros.disponibilidade.includes('emEstoque')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.disponibilidade.includes('emEstoque') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="emEstoque" className="text-sm">Em Estoque</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="prePedido" 
                    name="disponibilidade" 
                    checked={filtros.disponibilidade.includes('prePedido')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.disponibilidade.includes('prePedido') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="prePedido" className="text-sm">Pré-Ordem</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="semChegada" 
                    name="disponibilidade" 
                    checked={filtros.disponibilidade.includes('semChegada')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.disponibilidade.includes('semChegada') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="semChegada" className="text-sm">Sem Chegada</label>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold mb-4">Interface</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="telefone" 
                    name="interface" 
                    checked={true} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  </div>
                </div>
                <label htmlFor="telefone" className="text-sm">Telefone</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="bluetooth" 
                    name="interface" 
                    checked={false} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  </div>
                </div>
                <label htmlFor="bluetooth" className="text-sm">Bluetooth</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="cabo" 
                    name="interface" 
                    checked={false} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  </div>
                </div>
                <label htmlFor="cabo" className="text-sm">Cabo</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="usb" 
                    name="interface" 
                    checked={false} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  </div>
                </div>
                <label htmlFor="usb" className="text-sm">USB</label>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold mb-4">Marca</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="apple" 
                    name="marca" 
                    checked={filtros.marcas.includes('apple')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.marcas.includes('apple') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="apple" className="text-sm">Apple</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="samsung" 
                    name="marca" 
                    checked={filtros.marcas.includes('samsung')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.marcas.includes('samsung') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="samsung" className="text-sm">Samsung</label>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <input 
                    type="radio" 
                    id="nokia" 
                    name="marca" 
                    checked={filtros.marcas.includes('nokia')} 
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {filtros.marcas.includes('nokia') && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
                <label htmlFor="nokia" className="text-sm">Nokia</label>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAplicarFiltro}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition-colors"
          >
            Aplicar Filtro
          </button>
        </div>
      </div>
    </>
  );
};

export default Filtro;
