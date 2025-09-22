import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Header from './Header';

interface UnlockDevicePageProps {
  deviceName: string;
  onUnlock: (password: string) => void;
  onCancel: () => void;
  onLogout: () => void;
}

export default function UnlockDevicePage({ deviceName, onUnlock, onCancel, onLogout }: UnlockDevicePageProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      setIsLoading(true);
      // Simular delay de autenticação
      setTimeout(() => {
        onUnlock(password);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="pathologist" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb/Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="mb-4 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Card de Autenticação Centralizado */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-slate-800 mb-2">Desbloquear Acesso</CardTitle>
                <p className="text-sm text-slate-600">
                  Para sua segurança, por favor, insira a senha do seu usuário para continuar.
                </p>
                <div className="mt-4 px-4 py-2 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Dispositivo:</span> {deviceName}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha do Usuário</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="pr-10"
                        disabled={isLoading}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!password.trim() || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Verificando...
                        </div>
                      ) : (
                        'Confirmar'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      className="w-full"
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
                
                {/* Informação adicional */}
                <div className="mt-6 p-3 bg-slate-50 rounded-md">
                  <p className="text-xs text-slate-600 text-center">
                    🔒 Seus dados estão protegidos por criptografia de ponta a ponta
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}