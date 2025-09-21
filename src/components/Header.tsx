import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  userType: 'doctor' | 'pathologist';
  onLogout: () => void;
}

export default function Header({ userType, onLogout }: HeaderProps) {
  const userTypeLabel = userType === 'doctor' ? 'Médico' : 'Patologista';
  
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl text-slate-800">LabVision</h1>
              <p className="text-xs text-slate-600">Dashboard {userTypeLabel}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <User className="w-4 h-4" />
              <span className="text-sm">{userTypeLabel}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="text-slate-600 hover:text-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}