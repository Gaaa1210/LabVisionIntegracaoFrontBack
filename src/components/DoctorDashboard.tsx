import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Eye, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from './Header';

interface Exam {
  id: string;
  patient: string;
  type: string;
  status: 'pendente' | 'em_analise' | 'concluido';
  date: string;
  hasReport: boolean;
}

interface DoctorDashboardProps {
  onLogout: () => void;
  onViewReport: (examId: string) => void;
  onCreateExam?: () => void;
}

export default function DoctorDashboard({ onLogout, onViewReport, onCreateExam }: DoctorDashboardProps) {
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
      status: 'em_analise',
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
      patient: 'Roberto Ferreira',
      type: 'Biópsia de Pele',
      status: 'concluido',
      date: '2024-01-22',
      hasReport: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'em_analise':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><AlertCircle className="w-3 h-3 mr-1" />Em Análise</Badge>;
      case 'concluido':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Concluído</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="doctor" onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total de Exames</p>
                  <p className="text-2xl text-slate-800">{exams.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Em Análise</p>
                  <p className="text-2xl text-slate-800">{exams.filter(e => e.status === 'em_analise').length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Concluídos</p>
                  <p className="text-2xl text-slate-800">{exams.filter(e => e.status === 'concluido').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>



        <div className="mb-8">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onCreateExam?.()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Solicitar Novo Exame
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Exames Solicitados
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