import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, Microscope, Clock, User, Calendar, Building2, FlaskConical, MonitorSpeaker, TestTube, Beaker } from 'lucide-react';
import Header from './Header';

interface PendingExam {
  id: string;
  patient: string;
  type: string;
  date: string;
  priority: 'baixa' | 'media' | 'alta';
  requestingDoctor: string;
}

interface Laboratory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'online' | 'offline';
  examsCount: number;
}

interface PathologistDashboardProps {
  onLogout: () => void;
  onViewExamDetails: (examId: string) => void;
  onSelectLab: (labId: string, deviceName: string) => void;
}

export default function PathologistDashboard({ onLogout, onViewExamDetails, onSelectLab }: PathologistDashboardProps) {
  const [pendingExams] = useState<PendingExam[]>([
    {
      id: '2',
      patient: 'João Carlos Oliveira',
      type: 'Análise Histopatológica',
      date: '2024-01-18',
      priority: 'alta',
      requestingDoctor: 'Dr. Carlos Mendes'
    },
    {
      id: '3',
      patient: 'Ana Paula Costa',
      type: 'Citologia Cervical',
      date: '2024-01-20',
      priority: 'media',
      requestingDoctor: 'Dra. Maria Fernanda'
    },
    {
      id: '5',
      patient: 'Pedro Santos Lima',
      type: 'Biópsia de Próstata',
      date: '2024-01-23',
      priority: 'alta',
      requestingDoctor: 'Dr. Roberto Silva'
    },
    {
      id: '6',
      patient: 'Luciana Rocha',
      type: 'Análise de Linfonodo',
      date: '2024-01-24',
      priority: 'baixa',
      requestingDoctor: 'Dr. João Pereira'
    }
  ]);

  const [laboratories] = useState<Laboratory[]>([
    {
      id: 'lab-a',
      name: 'Lab Vision A',
      icon: Microscope,
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
      icon: Microscope,
      status: 'offline',
      examsCount: 5
    },
    {
      id: 'lab-d',
      name: 'Lab Vision D',
      icon: Microscope,
      status: 'online',
      examsCount: 15
    },
    {
      id: 'lab-e',
      name: 'Lab Vision E',
      icon: Microscope,
      status: 'online',
      examsCount: 7
    },
    {
      id: 'lab-f',
      name: 'Lab Vision F',
      icon: Microscope,
      status: 'offline',
      examsCount: 3
    },
    {
      id: 'lab-g',
      name: 'Lab Vision G',
      icon: Microscope,
      status: 'online',
      examsCount: 11
    },
    {
      id: 'lab-h',
      name: 'Lab Vision H',
      icon: Microscope,
      status: 'online',
      examsCount: 9
    }
  ]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'media':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case 'baixa':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Baixa</Badge>;
      default:
        return null;
    }
  };

  const handleSelectLab = (labId: string) => {
    // Encontrar o laboratório clicado
    const lab = laboratories.find(l => l.id === labId);
    if (lab) {
      onSelectLab(lab.id, lab.name);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="pathologist" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Exames Pendentes</p>
                  <p className="text-2xl text-slate-800">{pendingExams.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between bg-[rgba(0,0,0,0)]">
                <div>
                  <p className="text-sm text-slate-600">Concluídos Hoje</p>
                  <p className="text-2xl text-slate-800">3</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layout principal: Lab Vision centralizado */}
        <div className="flex justify-center">
          {/* Lab Vision Cards - Centralizado */}
          <div className="w-full max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  Máquinas Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  {laboratories.map((lab) => {
                    const IconComponent = lab.icon;
                    return (
                      <Card 
                        key={lab.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          lab.status === 'online' 
                            ? 'hover:border-blue-300 hover:bg-blue-50' 
                            : 'opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => lab.status === 'online' && handleSelectLab(lab.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <IconComponent className="w-8 h-8 text-blue-600" />
                            <div className={`w-2 h-2 rounded-full ${
                              lab.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                          </div>
                          
                          <h4 className="text-slate-800 mb-2">{lab.name}</h4>
                          
                          <div className="space-y-1 text-xs text-slate-600">
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className={`capitalize ${
                                lab.status === 'online' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {lab.status === 'online' ? 'Online' : 'Offline'}
                              </span>
                            </div>

                          </div>
                          
                          {lab.status === 'offline' && (
                            <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                              Temporariamente indisponível
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}