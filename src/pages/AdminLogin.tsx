import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "@/components/StatusBar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Bem-vindo", description: "Login realizado com sucesso." });
      navigate("/admin", { replace: true });
    } catch (err: any) {
      toast({ title: "Falha no login", description: err.message || "Verifique suas credenciais.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar />
      <div className="page-container min-h-[70vh] flex items-center">
        <Card className="w-full p-6">
          <h1 className="title-text mb-4">Acesso Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Senha</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
