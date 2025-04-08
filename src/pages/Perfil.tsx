import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, File, Phone, ChevronRight, Lock } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Perfil: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('isfindings@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'isfindings@gmail.com' && password === 'IS123') {
      setIsLoginOpen(false);
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo à área restrita.",
      });
      navigate('/admin');
    } else {
      setError('Acesso negado. Verifique suas credenciais.');
    }
  };

  return (
    <>
      <StatusBar />
      <div className="page-container">
        <h1 className="title-text py-4 mb-6">Meu Perfil</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-orange-100 flex items-center justify-center">
              <img
                src="/isfindings.jpg"
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
          
          {!isAdmin ? (
            <Button 
              variant="outline" 
              className="mt-4 flex items-center gap-2 bg-orange-100 hover:bg-orange-200 border-orange-300"
              onClick={() => setIsLoginOpen(true)}
            >
              <Lock className="w-4 h-4 text-orange-600" />
              <span>Área Restrita (DM)</span>
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="mt-4 w-full"
              onClick={() => navigate('/admin')}
            >
              Acessar Painel Administrativo
            </Button>
          )}
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

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acesso Restrito</DialogTitle>
            <DialogDescription>
              Digite suas credenciais para acessar a área de administração.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsLoginOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Acessar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Navbar />
    </>
  );
};

export default Perfil;
