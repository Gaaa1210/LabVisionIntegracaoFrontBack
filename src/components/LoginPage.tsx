import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LoginPageProps {
  onLogin: (userType: 'doctor' | 'pathologist') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - in real app this would validate credentials
    if (email.includes('medico') || email.includes('doctor')) {
      onLogin('doctor');
    } else {
      onLogin('pathologist');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl text-slate-800">LabVision</CardTitle>
          <p className="text-slate-600 mt-2">Sistema de Gestão de Exames de Patologia</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
            >
              Entrar
            </Button>
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                Esqueci minha senha
              </a>
            </div>
          </form>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600 mb-2">Para demonstração, use:</p>
            <p className="text-xs text-slate-700">• medico@exemplo.com (Dashboard Médico)</p>
            <p className="text-xs text-slate-700">• patologista@exemplo.com (Dashboard Patologista)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}