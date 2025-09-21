import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Eye, Microscope, User, Calendar, Play } from 'lucide-react';
import Header from './Header';

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
      patient: 'João Carlos Oliveira',
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
    <div className="min-h-screen bg-slate-50">
      <Header userType="pathologist" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}


        {/* Tabela de Exames */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Microscope className="w-5 h-5 mr-2 text-blue-600" />
              Exames Pendentes - {labInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Tipo de Exame</TableHead>
                  <TableHead>Médico Solicitante</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="text-slate-800">{exam.patient}</div>
                        <div className="text-xs text-slate-500">{exam.age} anos • {exam.gender === 'M' ? 'Masculino' : 'Feminino'}</div>
                      </div>
                    </TableCell>
                    <TableCell>{exam.type}</TableCell>
                    <TableCell>{exam.requestingDoctor}</TableCell>
                    <TableCell>{new Date(exam.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => onStartMeasurement(exam.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Iniciar Medição
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}