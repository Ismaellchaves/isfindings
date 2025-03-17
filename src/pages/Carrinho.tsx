import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import { produtos } from '@/lib/dados';
import { ItemCarrinho } from '@/lib/tipos';

const Carrinho: React.FC = () => {
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]); // Carrinho começa vazio

  const subtotal = itensCarrinho.reduce((total, item) =>
    total + (item.produto.preco * item.quantidade), 0);

  const desconto = 10;
  const total = subtotal - desconto;

  const atualizarQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;

    setItensCarrinho(prev =>
      prev.map(item =>
        item.produto.id === id
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  const removerItem = (id: string) => {
    setItensCarrinho(prev => prev.filter(item => item.produto.id !== id));
  };

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <h1 className="title-text py-4 mb-4">Carrinho</h1>

        {itensCarrinho.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              {itensCarrinho.map((item) => (
                <div key={item.produto.id} className="flex bg-white p-3 rounded-xl shadow-subtle">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-3">
                    <img
                      src={item.produto.imagem}
                      alt={item.produto.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.produto.nome}</h3>
                      <button
                        onClick={() => removerItem(item.produto.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-sm text-gray-500 mb-2">
                      Tamanho: {item.produto.tamanhos?.[0] || 'Único'}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-orange-500">
                        R${item.produto.preco}
                      </span>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-sm font-medium">{item.quantidade}</span>

                        <button
                          onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 shadow-subtle mb-6">
              <h2 className="font-semibold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>R${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Desconto</span>
                  <span className="text-green-500">-R${desconto.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold">R${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full text-center transition-colors"
            >
              Finalizar Compra
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
            <p className="text-gray-500 max-w-xs mb-6">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho
            </p>
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-full text-center transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default Carrinho;