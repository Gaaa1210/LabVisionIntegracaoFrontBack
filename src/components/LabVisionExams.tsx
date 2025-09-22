import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Eye, Microscope, User, Calendar, Play } from 'lucide-react';

interface PendingExam {
  id: string;
  patient: string;
  type: string;
  date: string;
  priority: 'baixa' | 'media' | 'alta';
  requestingDoctor: string;
  age: number;
  gender: string;
}

interface LabVisionExamsProps {
  labId: string;
  onLogout: () => void;
  onBack: () => void;
  onStartMeasurement: (examId: string) => void;
  onViewExamDetails: (examId: string) => void;
}

export default function LabVisionExams({ 
  labId, 
  onLogout, 
  onBack, 
  onStartMeasurement, 
  onViewExamDetails 
}: LabVisionExamsProps) {
  
  // Mock data baseado no labId
  const [labInfo] = useState(() => {
    const labs = {
      'lab-a': { name: 'Lab Vision A', location: 'Sala 101' },
      'lab-b': { name: 'Lab Vision B', location: 'Sala 102' },
      'lab-c': { name: 'Lab Vision C', location: 'Sala 103' }
    };
    return labs[labId as keyof typeof labs] || { name: 'Lab Vision', location: 'Localização não encontrada' };
  });

  const [pendingExams] = useState<PendingExam[]>([
    {
      id: '2',
      patient: 'gostoso Carlos Oliveira',
      type: 'Análise Histopatológica',
      date: '2024-01-18',
      priority: 'alta',
      requestingDoctor: 'Dr. Carlos Mendes',
      age: 45,
      gender: 'M'
    },
    {
      id: '3',
      patient: 'Ana Paula Costa',
      type: 'Citologia Cervical',
      date: '2024-01-20',
      priority: 'media',
      requestingDoctor: 'Dra. Maria Fernanda',
      age: 32,
      gender: 'F'
    },
    {
      id: '5',
      patient: 'Pedro Santos Lima',
      type: 'Biópsia de Próstata',
      date: '2024-01-23',
      priority: 'alta',
      requestingDoctor: 'Dr. Roberto Silva',
      age: 58,
      gender: 'M'
    },
    {
      id: '6',
      patient: 'Luciana Rocha',
      type: 'Análise de Linfonodo',
      date: '2024-01-24',
      priority: 'baixa',
      requestingDoctor: 'Dr. João Pereira',
      age: 28,
      gender: 'F'
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

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col overflow-hidden relative">
      {/* Botão Voltar - Fixo no canto superior direito */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          size="sm"
          className="text-slate-300 hover:text-white hover:bg-slate-800/80 backdrop-blur-sm h-8 px-3 rounded-full border border-slate-700/50"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          <span className="text-xs">Voltar</span>
        </Button>
      </div>

      {/* Layout compacto para iPhone 5 landscape (568x320) */}
      <div className="flex-1 flex items-center justify-center p-2">
        
        {/* Card de Exames Pendentes */}
        <div className="w-full h-full max-h-[300px]">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-white flex items-center text-sm">
                <Microscope className="w-3 h-3 mr-1 text-blue-400" />
                Exames Pendentes - {labInfo.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 h-[calc(100%-60px)] overflow-y-auto">
              <div className="space-y-2">
                {pendingExams.map((exam) => (
                  <div 
                    key={exam.id} 
                    className="bg-slate-700 rounded-lg p-3 border border-slate-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white text-sm">{exam.patient}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {exam.age} anos • {exam.gender === 'M' ? 'M' : 'F'} • {exam.type}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {exam.requestingDoctor} • {new Date(exam.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(exam.priority)}
                        <Button
                          size="sm"
                          onClick={() => onStartMeasurement(exam.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 h-6 text-xs"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}