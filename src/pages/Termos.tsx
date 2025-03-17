
import React from 'react';
import StatusBar from '@/components/StatusBar';
import HeaderBack from '@/components/HeaderBack';

const Termos: React.FC = () => {
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <HeaderBack title="Termos e Condições" />
        
        <div className="bg-white rounded-xl p-6 shadow-subtle">
          <h2 className="text-xl font-bold mb-4">Termos e Condições de Uso</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Bem-vindo à ISFINDINGS! Ao acessar ou usar nosso aplicativo, você concorda com estes termos e condições.
            </p>
            
            <h3 className="font-semibold text-lg mt-2">1. Uso do Aplicativo</h3>
            <p>
              O uso do aplicativo ISFINDINGS é destinado a pessoas maiores de 18 anos. Ao usar nosso aplicativo, você concorda em fornecer informações precisas e atualizadas.
            </p>
            
            <h3 className="font-semibold text-lg mt-2">2. Produtos e Preços</h3>
            <p>
              Todos os produtos exibidos estão sujeitos à disponibilidade. Reservamo-nos o direito de modificar preços a qualquer momento.
            </p>
            
            <h3 className="font-semibold text-lg mt-2">3. Privacidade</h3>
            <p>
              Sua privacidade é importante para nós. Coletamos informações necessárias para processar pedidos e melhorar sua experiência de compra.
            </p>
            
            <h3 className="font-semibold text-lg mt-2">4. Alterações nos Termos</h3>
            <p>
              Podemos alterar estes termos a qualquer momento. É sua responsabilidade revisar periodicamente nossos termos e condições.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Termos;
