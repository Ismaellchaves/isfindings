
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CreditCard, File, Phone, ChevronRight } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';

const Perfil: React.FC = () => {
  return (
    <>
      <StatusBar />
      <div className="page-container">
        <h1 className="title-text py-4 mb-6">Meu Perfil</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-orange-100 flex items-center justify-center">
              <img
                src="/public/isfindings.jpg"
                alt="Imagem de perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-semibold">ISFINDINGS</h2>
          <p className="text-gray-500 text-sm">isfindings@gmail.com</p>
        </div>

        <div className="space-y-4">
          <Link to="/enderecos" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <span className="font-medium">Endereços Salvos</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link to="/carteira" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-orange-500" />
              </div>
              <span className="font-medium">Minha Carteira</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link to="/termos" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <File className="w-5 h-5 text-orange-500" />
              </div>
              <span className="font-medium">Termos e Condições</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link to="/suporte" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-subtle">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-orange-500" />
              </div>
              <span className="font-medium">Ajuda e Suporte</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Perfil;
