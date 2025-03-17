
import React from 'react';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Suporte: React.FC = () => {
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title="Ajuda e Suporte" />
        
        <div className="bg-white rounded-xl p-6 shadow-subtle mb-6">
          <h2 className="text-xl font-bold mb-4">Como podemos ajudar?</h2>
          <p className="text-gray-700 mb-6">
            Estamos aqui para ajudar com qualquer dúvida ou problema que você possa ter. Entre em contato conosco através dos canais abaixo.
          </p>
          
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">isfindings@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Chat</h3>
                <p className="text-gray-600">Disponível de segunda a sexta, das 9h às 18h</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-subtle">
          <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Como rastrear meu pedido?</h3>
              <p className="text-gray-600">Você pode rastrear seu pedido na seção "Meus Pedidos" após fazer login.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Qual é a política de devolução?</h3>
              <p className="text-gray-600">Aceitamos devoluções em até 30 dias após a compra, desde que o produto esteja em perfeitas condições.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Quanto tempo leva para entregar?</h3>
              <p className="text-gray-600">O prazo de entrega varia de acordo com sua localização, mas geralmente é de 3 a 7 dias úteis.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suporte;
