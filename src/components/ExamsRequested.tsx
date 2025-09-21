import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Eye, FileText, ArrowLeft } from 'lucide-react';
import Header from './Header';

interface Exam {
  id: string;
  patient: string;
  type: string;
  status: 'pendente' | 'processando' | 'concluido';
  date: string;
  hasReport: boolean;
}

interface ExamsRequestedProps {
  labId: string;
  onLogout: () => void;
  onViewReport: (examId: string) => void;
  onCreateExam: () => void;
  onBack: () => void;
}

export default function ExamsRequested({ labId, onLogout, onViewReport, onCreateExam, onBack }: ExamsRequestedProps) {
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      patient: 'Maria Silva Santos',
      type: 'Biópsia de Mama',
      status: 'concluido',
      date: '2024-01-15',
      hasReport: true
    },
    {
      id: '2',
      patient: 'João Carlos Oliveira',
      type: 'Análise Histopatológica',
      status: 'processando',
      date: '2024-01-18',
      hasReport: false
    },
    {
      id: '3',
      patient: 'Ana Paula Costa',
      type: 'Citologia Cervical',
      status: 'pendente',
      date: '2024-01-20',
      hasReport: false
    },
    {
      id: '4',
      patient: 'Carlos Eduardo Lima',
      type: 'Biópsia de Pele',
      status: 'concluido',
      date: '2024-01-22',
      hasReport: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'processando':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processando</Badge>;
      case 'concluido':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Concluído</Badge>;
      default:
        return null;
    }
  };

  const getLabName = (labId: string) => {
    const labNames: { [key: string]: string } = {
      'lab-a': 'Lab Vision A',
      'lab-b': 'Lab Vision B',
      'lab-c': 'Lab Vision C'
    };
    return labNames[labId] || 'Laboratório';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="doctor" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-slate-600 hover:text-slate-800 p-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Lab Vision Disponíveis
          </Button>
          <h2 className="text-2xl text-slate-800 mb-2">Exames Solicitados</h2>
          <p className="text-slate-600">{getLabName(labId)} - Gerencie os exames solicitados</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Exames Solicitados
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={onCreateExam}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Tipo de Exame</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.patient}</TableCell>
                    <TableCell>{exam.type}</TableCell>
                    <TableCell>{getStatusBadge(exam.status)}</TableCell>
                    <TableCell>{new Date(exam.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      {exam.hasReport ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onViewReport(exam.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Visualizar Laudo
                        </Button>
                      ) : (
                        <span className="text-slate-400 text-sm">Aguardando análise</span>
                      )}
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