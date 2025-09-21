import { Card, CardContent } from './ui/card';
import { Building2, Microscope, FlaskConical } from 'lucide-react';
import Header from './Header';

interface Laboratory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'online' | 'offline';
  examsCount: number;
}

interface LabVisionListProps {
  onLogout: () => void;
  onSelectLab: (labId: string) => void;
}

export default function LabVisionList({ onLogout, onSelectLab }: LabVisionListProps) {
  const laboratories: Laboratory[] = [
    {
      id: 'lab-a',
      name: 'Lab Vision A',
      icon: Building2,
      status: 'online',
      examsCount: 12
    },
    {
      id: 'lab-b',
      name: 'Lab Vision B',
      icon: Microscope,
      status: 'online',
      examsCount: 8
    },
    {
      id: 'lab-c',
      name: 'Lab Vision C',
      icon: FlaskConical,
      status: 'offline',
      examsCount: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="doctor" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl text-slate-800 mb-2">Lab Vision Disponíveis</h2>
          <p className="text-slate-600">Selecione um laboratório para visualizar os exames</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratories.map((lab) => {
            const IconComponent = lab.icon;
            return (
              <Card 
                key={lab.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  lab.status === 'online' 
                    ? 'hover:border-blue-300 hover:bg-blue-50' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => lab.status === 'online' && onSelectLab(lab.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-12 h-12 text-blue-600" />
                    <div className={`w-3 h-3 rounded-full ${
                      lab.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  
                  <h3 className="text-lg text-slate-800 mb-2">{lab.name}</h3>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`capitalize ${
                        lab.status === 'online' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {lab.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exames pendentes:</span>
                      <span className="text-slate-800">{lab.examsCount}</span>
                    </div>
                  </div>
                  
                  {lab.status === 'offline' && (
                    <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded">
                      Laboratório temporariamente indisponível
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}